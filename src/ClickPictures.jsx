import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const filters = [
  { name: 'Original', class: '' },
  { name: 'Vintage', class: 'sepia(100%)' },
  { name: 'B&W', class: 'grayscale(100%)' },
];

const ClickPictures = () => {
  const webcamRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [capturedImages, setCapturedImages] = useState([]);
  const navigate = useNavigate();

  const handleCapture = () => {
    if (capturedImages.length < 3) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImages(prev => [{ src: imageSrc, filter: selectedFilter }, ...prev]);
      }
    }
  };

  const handleNext = () => {
    if (capturedImages.length > 0) {
      navigate('/next', { state: { images: capturedImages } });
    }
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
        {/* Back arrow button */}
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
            maxWidth: '640px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{
              width: '100%',
              borderRadius: '16px',
              filter: selectedFilter,
              border: '6px solid #B3B792',
            }}
            videoConstraints={{ facingMode: 'user' }}
          />

          <div
            style={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.class)}
                style={{
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor:
                    selectedFilter === filter.class ? '#725C3A' : '#D2AB80',
                  color: selectedFilter === filter.class ? '#fff' : '#403225',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: "'Quicksand', sans-serif",
                }}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              onClick={handleCapture}
              disabled={capturedImages.length >= 3}
              style={{
                padding: '12px 24px',
                backgroundColor:
                  capturedImages.length < 3 ? '#E5D2B8' : '#ccc',
                color: '#403225',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: capturedImages.length < 3 ? 'pointer' : 'not-allowed',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                opacity: capturedImages.length < 3 ? 1 : 0.6,
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              {capturedImages.length < 3 ? 'Capture' : 'Limit Reached'}
            </button>

            <button
              onClick={handleNext}
              disabled={capturedImages.length === 0}
              style={{
                padding: '12px 24px',
                backgroundColor:
                  capturedImages.length > 0 ? '#809671' : '#B3B792',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: capturedImages.length > 0 ? 'pointer' : 'not-allowed',
                opacity: capturedImages.length > 0 ? 1 : 0.6,
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              Next →
            </button>
          </div>
        </div>

        {capturedImages.length > 0 && (
          <div
            style={{
              marginTop: '40px',
              maxWidth: '860px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            {capturedImages.map(({ src, filter }, index) => (
              <img
                key={index}
                src={src}
                alt={`Capture ${index + 1}`}
                style={{
                  width: '150px',
                  height: 'auto',
                  borderRadius: '12px',
                  border: '4px solid #D2AB80',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  filter: filter,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ClickPictures;
