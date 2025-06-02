import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const photostripColors = ['#ffffff', '#000000', '#d2ab80', '#b3b792', '#809671'];
const backgroundColors = ['#E5E0D8', '#F9F7F3', '#725C3A', '#D2AB80', '#B3B792'];

const Next = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get images and selectedFilter from router state
  const stateImages = location.state?.images;
  const stateSelectedFilter = location.state?.selectedFilter;

  // Normalize images array
  let images = [];
  if (Array.isArray(stateImages) && stateImages.length > 0) {
    if (typeof stateImages[0] === 'object' && stateImages[0] !== null) {
      if ('src' in stateImages[0]) {
        images = stateImages.map(img => img.src || img);
      } else {
        images = stateImages;
      }
    } else {
      images = stateImages;
    }
  }

  // Fallback to test images if no images in state
  const testImages = [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIDE8L3RleHQ+PC9zdmc+',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYmJiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIDI8L3RleHQ+PC9zdmc+',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYWFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIDM8L3RleHQ+PC9zdmc+'
  ];
  if (images.length === 0) {
    images = testImages;
  }

  const [selectedFilter, setSelectedFilter] = useState(stateSelectedFilter || 'vintage');
  const [step, setStep] = useState(1);
  const [sharedNote, setSharedNote] = useState('');
  const [photostripColor, setPhotostripColor] = useState(photostripColors[0]);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
  const [showDate, setShowDate] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const polaroidRef = useRef();

  // Helper to get CSS filter string for a given filter key
  const getFilterStyle = (filterKey = selectedFilter) => {
    switch (filterKey) {
      case 'sepia':
        return 'sepia(60%) contrast(110%) brightness(90%)';
      case 'blackAndWhite':
        return 'grayscale(100%) contrast(120%)';
      case 'vintage':
        return 'sepia(40%) contrast(120%) brightness(90%) hue-rotate(-10deg)';
      case 'warm':
        return 'sepia(30%) contrast(110%) brightness(105%) hue-rotate(5deg)';
      default:
        return 'none';
    }
  };

  // Helper to apply CSS filter to an image and return a canvas
  function applyImageFilter(img, filterKey) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.save();
    const filterStyle = getFilterStyle(filterKey);
    if (filterStyle && filterStyle !== 'none') {
      tempCtx.filter = filterStyle;
    }
    tempCtx.drawImage(img, 0, 0);
    tempCtx.restore();
    return tempCanvas;
  }

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let loadPromises = [];
    let loadedImages = [];

    images.forEach((imgSrc, index) => {
      if (imgSrc) {
        const promise = new Promise((resolve, reject) => {
          const image = new Image();
          image.addEventListener('load', () => {
            loadedImages[index] = image;
            resolve();
          });
          image.addEventListener('error', error => reject(error));
          image.setAttribute('crossOrigin', 'anonymous');
          image.src = imgSrc;
        });
        loadPromises.push(promise);
      }
    });

    Promise.all(loadPromises).then(() => {
      const validImages = loadedImages.filter(img => img);
      // Calculate optimal canvas size based on images
      let maxWidth = 0;
      let totalHeight = 0;
      const verticalSpacing = 60;
      const horizontalPadding = 100;
      const framePadding = 24;
      const frameRadius = 18;
      const frameShadow = 'rgba(0,0,0,0.10)';

      // Calculate dimensions
      validImages.forEach(img => {
        const aspectRatio = img.width / img.height;
        const targetWidth = Math.min(800, img.width);
        const targetHeight = targetWidth / aspectRatio;
        maxWidth = Math.max(maxWidth, targetWidth);
        totalHeight += targetHeight + (framePadding * 2);
      });
      totalHeight += (validImages.length - 1) * verticalSpacing;
      totalHeight += 200; // Extra space for title/note/date

      // Set canvas dimensions
      canvas.width = maxWidth + (horizontalPadding * 2);
      canvas.height = totalHeight;

      // Fill background
      ctx.fillStyle = photostripColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle paper texture
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      for (let i = 0; i < canvas.width; i += 4) {
        for (let j = 0; j < canvas.height; j += 4) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i, j, 4, 4);
          }
        }
      }
      ctx.restore();

      // Draw title (optional)
      let currentY = 60;
      ctx.save();
      ctx.fillStyle = '#725C3A';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';


      ctx.restore();
      currentY += 60;

      // Draw each image with frame
      validImages.forEach((img, index) => {
        const aspectRatio = img.width / img.height;
        const targetWidth = Math.min(800, img.width);
        const targetHeight = targetWidth / aspectRatio;
        const x = (canvas.width - targetWidth) / 2;
        // Draw frame (rounded white rectangle with shadow)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - framePadding + frameRadius, currentY - framePadding);
        ctx.lineTo(x + targetWidth + framePadding - frameRadius, currentY - framePadding);
        ctx.quadraticCurveTo(x + targetWidth + framePadding, currentY - framePadding, x + targetWidth + framePadding, currentY - framePadding + frameRadius);
        ctx.lineTo(x + targetWidth + framePadding, currentY + targetHeight + framePadding - frameRadius);
        ctx.quadraticCurveTo(x + targetWidth + framePadding, currentY + targetHeight + framePadding, x + targetWidth + framePadding - frameRadius, currentY + targetHeight + framePadding);
        ctx.lineTo(x - framePadding + frameRadius, currentY + targetHeight + framePadding);
        ctx.quadraticCurveTo(x - framePadding, currentY + targetHeight + framePadding, x - framePadding, currentY + targetHeight + framePadding - frameRadius);
        ctx.lineTo(x - framePadding, currentY - framePadding + frameRadius);
        ctx.quadraticCurveTo(x - framePadding, currentY - framePadding, x - framePadding + frameRadius, currentY - framePadding);
        ctx.closePath();
        ctx.shadowColor = frameShadow;
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();
        // Draw filtered image
        const filteredCanvas = applyImageFilter(img, selectedFilter);
        ctx.drawImage(filteredCanvas, x, currentY, targetWidth, targetHeight);
        // Add subtle border
        ctx.save();
        ctx.strokeStyle = '#e0d6c8';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, currentY, targetWidth, targetHeight);
        ctx.restore();
        currentY += targetHeight + (framePadding * 2) + verticalSpacing;
      });

      // Draw note/caption if present
      if (sharedNote.trim()) {
        ctx.save();
        ctx.fillStyle = '#809671';
        ctx.font = 'italic 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`"${sharedNote.trim()}"`, canvas.width / 2, currentY);
        ctx.restore();
        currentY += 40;
      }
      // Draw date if enabled
      if (showDate) {
        ctx.save();
        ctx.fillStyle = '#725C3A';
        ctx.font = 'italic 28px Arial';
        ctx.textAlign = 'center';
        const date = new Date().toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        });
        ctx.fillText(date, canvas.width / 2, currentY + 30);
        ctx.restore();
      }
      // Download
      const link = document.createElement('a');
      link.download = 'vintage-photostrip.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    });
  };

  const getDateString = () => {
    const d = new Date();
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div style={{ 
      backgroundColor: backgroundColor,
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#725C3A',
      padding: '20px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&family=Pacifico&family=Caveat:wght@400;600&display=swap');
        
        .back-button {
          position: fixed;
          top: 20px;
          left: 20px;
          background-color: #725C3A;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          color: #E5E0D8;
          font-size: 20px;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .back-button:hover {
          background-color: #5a4a2f;
        }
        
        .container {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: 40px auto;
        }
        
        .step-container {
          max-width: 700px;
          margin: 40px auto;
          text-align: center;
          background: white;
          padding: 30px 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          color: #725C3A;
        }
        
        .color-picker {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }
        
        .color-box {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          cursor: pointer;
          border: 3px solid transparent;
          transition: border-color 0.3s ease;
        }
        
        .color-box.selected {
          border-color: #725C3A;
        }
        
        .checkbox-wrapper {
          margin-top: 20px;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #725C3A;
          cursor: pointer;
          user-select: none;
        }
        
        .vintage-photostrip {
          width: 400px;
          background: ${photostripColor};
          border-radius: 20px;
          padding: 20px 25px;
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.2),
            inset 0 2px 10px rgba(255,255,255,0.8),
            inset 0 -2px 10px rgba(0,0,0,0.1);
          position: relative;
          transform: rotateY(-5deg) rotateX(2deg);
          transition: transform 0.3s ease;
          border: 2px solid #ddd;
          margin: 20px auto;
        }
        
        .vintage-photostrip:hover {
          transform: rotateY(0deg) rotateX(0deg);
        }
        
        .strip-title {
          font-family: 'Caveat', cursive;
          font-size: 20px;
          font-weight: 600;
          color: #725C3A;
          margin: 0 0 15px 0;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        .vintage-photo-frame {
          background: white;
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          margin-bottom: 8px;
          overflow: hidden;
        }
        
        .vintage-photo-frame img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 4px;
          display: block;
          filter: ${getFilterStyle()};
        }
        
        .strip-footer {
          text-align: center;
          padding-top: 10px;
          border-top: 1px solid rgba(114, 92, 58, 0.2);
          margin-top: 10px;
        }
        
        .strip-date {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  margin: 5px 0;
}

.strip-note {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  color: #FFFFFF;
  font-style: italic;
  margin: 5px 0;
  word-wrap: break-word;
  line-height: 1.3;
}


        
        button {
          cursor: pointer;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          background-color: #809671;
          color: white;
          font-weight: 700;
          margin: 10px;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        
        button:hover:not(:disabled) {
          background-color: #6a7c56;
          transform: translateY(-1px);
        }
        
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .download-btn {
          background: linear-gradient(145deg, #809671, #6a7c56);
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(128, 150, 113, 0.3);
        }
        
        textarea {
          width: 100%;
          height: 120px;
          padding: 15px;
          font-size: 16px;
          border-radius: 12px;
          border: 2px solid #725C3A;
          resize: vertical;
          font-family: inherit;
          outline: none;
        }
        
        label {
          font-weight: 700;
          display: block;
          margin-bottom: 10px;
          font-size: 18px;
        }
        
        h2, h3 {
          color: #725C3A;
          margin: 20px 0 10px 0;
        }
      `}</style>

      <button
  className="back-button"
  onClick={() => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/uploadpictures');
    }
  }}
  aria-label="Go back"
>
  ←
</button>


      {step === 1 && (
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            width: '100%',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <label htmlFor="shared-note" style={{
              display: 'block',
              fontWeight: '700',
              marginBottom: '15px',
              fontSize: '20px',
              color: '#725C3A'
            }}>Add a note!</label>
            <textarea
              id="shared-note"
              placeholder="Write your note here..."
              value={sharedNote}
              onChange={(e) => setSharedNote(e.target.value)}
              style={{
                width: 'calc(100% - 30px)',
                height: '120px',
                padding: '15px',
                fontSize: '16px',
                borderRadius: '12px',
                border: '2px solid #725C3A',
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none',
                marginBottom: '20px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setStep(2)}>Next</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-container">
          <h2>Customize your Photostrip!</h2>

          <div>
            <h3>Photostrip Color</h3>
            <div className="color-picker">
              {photostripColors.map((color) => (
                <div
                  key={color}
                  className={`color-box ${photostripColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setPhotostripColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div>
            <h3>Background Color</h3>
            <div className="color-picker">
              {backgroundColors.map((color) => (
                <div
                  key={color}
                  className={`color-box ${backgroundColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBackgroundColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <label className="checkbox-wrapper" onClick={() => setShowDate(!showDate)}>
            <input
              type="checkbox"
              checked={showDate}
              onChange={() => setShowDate(!showDate)}
            />
            Show Date on Photostrip
          </label>

          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step-container">
          
          
          <div className="vintage-photostrip" ref={polaroidRef}>
            
            
            <div className="vintage-photos-container">
              {images.map((img, index) => (
                <div className="vintage-photo-frame" key={index}>
                  <img
                    src={img}
                    alt={`Vintage photo ${index + 1}`}
                    style={{ filter: getFilterStyle() }}
                  />
                </div>
              ))}
            </div>
            
            <div className="strip-footer">
              {showDate && <div className="strip-date">{getDateString()}</div>}
              {sharedNote.trim() && (
                <div className="strip-note">"{sharedNote}"</div>
              )}
            </div>
          </div>
          
          <button 
            className="download-btn" 
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'Generating...' : 'Download Photostrip'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Next;