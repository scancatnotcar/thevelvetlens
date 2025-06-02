import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const filters = [
  { name: 'Classic', key: 'none' },
  { name: 'Vintage', key: 'vintage' },
  { name: 'B&W', key: 'blackAndWhite' },
];

// Helper to get CSS filter string for a given filter key
function getFilterStyle(filterKey) {
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
}

const UploadPictures = () => {
  const [images, setImages] = useState([
    { file: null, src: null },
    { file: null, src: null },
    { file: null, src: null },
  ]);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const navigate = useNavigate();

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = { file, src: reader.result };
        return newImages;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    navigate('/next', { state: { images, selectedFilter } });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0;
          padding: 0;
          font-family: 'Quicksand', sans-serif;
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#E5E0D8',
          padding: '20px',
          fontFamily: "'Quicksand', sans-serif",
          position: 'relative',
        }}
      >
        {/* Back arrow */}
        <button
          onClick={() => navigate('/')}
          aria-label="Go back to Home"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: '#725C3A',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            color: '#E5E0D8',
            fontSize: '22px',
            fontWeight: 'bold',
            lineHeight: '36px',
            textAlign: 'center',
            userSelect: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          ←
        </button>

        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#725C3A', marginBottom: '20px' }}>
            Upload your pictures!
          </h2>

          {/* Filter selector for all images */}
          <div
            style={{
              marginBottom: '30px',
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                style={{
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor:
                    selectedFilter === filter.key ? '#725C3A' : '#D2AB80',
                  color: selectedFilter === filter.key ? '#fff' : '#403225',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: "'Quicksand', sans-serif",
                  minWidth: '90px',
                }}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                style={{
                  border: '4px solid #D2AB80',
                  borderRadius: '16px',
                  padding: '10px',
                  backgroundColor: '#F9F7F3',
                  width: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {img.src ? (
                  <>
                    <img
                      src={img.src}
                      alt={`Upload ${index + 1}`}
                      style={{
                        width: '100%',
                        borderRadius: '12px',
                        filter: getFilterStyle(selectedFilter),
                        marginBottom: '10px',
                      }}
                    />
                    <label
                      htmlFor={`replace-image-${index}`}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#725C3A',
                        color: '#E5E0D8',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: "'Quicksand', sans-serif",
                      }}
                    >
                      Replace
                    </label>
                    <input
                      id={`replace-image-${index}`}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(index, e)}
                    />
                  </>
                ) : (
                  <>
                    <label
                      htmlFor={`upload-image-${index}`}
                      style={{
                        padding: '20px 10px',
                        border: '2px dashed #D2AB80',
                        borderRadius: '16px',
                        width: '100%',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: '#725C3A',
                        fontFamily: "'Quicksand', sans-serif",
                      }}
                    >
                      Click to upload
                    </label>
                    <input
                      id={`upload-image-${index}`}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(index, e)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={handleNext}
              disabled={images.every((img) => !img.src)}
              style={{
                padding: '12px 24px',
                backgroundColor: images.some((img) => img.src)
                  ? '#809671'
                  : '#B3B792',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: images.some((img) => img.src) ? 'pointer' : 'not-allowed',
                opacity: images.some((img) => img.src) ? 1 : 0.6,
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPictures;
