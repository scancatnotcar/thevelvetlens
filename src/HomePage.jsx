import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Typography, Button, GlobalStyles, keyframes } from "@mui/material";

const shutterClick = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.85) rotate(-5deg); }
`;

const lensPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(128, 150, 113, 0); }
  50% { box-shadow: 0 0 12px 6px rgba(128, 150, 113, 0.6); }
`;

const HomePage = () => {
  const navigate = useNavigate();

  const handleClickPictures = () => {
    navigate('/clickpictures');
  };

  const handleUploadPictures = () => {
    navigate('/uploadpictures'); // Navigate to UploadPictures page
  };

  return (
    <>
      <GlobalStyles
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Modeka&display=swap');
        `}
      />
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#E5E0D8",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#4B3621",
            fontFamily: "'Great Vibes', cursive",
            fontWeight: "400",
            mb: 2,
            fontSize: { xs: "3.5rem", md: "5rem" },
          }}
        >
          The Velvet Lens
        </Typography>

        {/* Camera */}
        <Box
          sx={{
            width: 90,
            height: 70,
            backgroundColor: "#B3B792",
            borderRadius: 3,
            position: "relative",
            animation: `${shutterClick} 3s ease-in-out infinite`,
            transformOrigin: "center",
            mb: 6,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
          aria-label="camera animation"
        >
          {/* Lens */}
          <Box
            sx={{
              width: 30,
              height: 30,
              backgroundColor: "#809671",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: `${lensPulse} 3s ease-in-out infinite`,
              boxShadow: "inset 0 0 6px #6B7C52",
            }}
          />

          {/* Viewfinder */}
          <Box
            sx={{
              width: 20,
              height: 12,
              backgroundColor: "#D2AB80",
              borderRadius: 2,
              position: "absolute",
              top: 12,
              right: 14,
            }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            color: "#809671",
            fontFamily: "'Dancing Script', cursive",
            maxWidth: "700px",
            mb: 4,
            fontSize: "1.8rem",
          }}
        >
          Creating timeless photo memories with a sprinkle of nostalgia.
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            variant="contained"
            onClick={handleClickPictures}
            sx={{
              backgroundColor: "#4B3621",
              color: "#E5D2B8",
              fontWeight: "400",
              fontFamily: "'Modeka', cursive",
              fontSize: "1rem",
              textTransform: "none",
              px: 2.5,
              py: 0.6,
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#5D3E1F",
                color: "#fff",
                boxShadow: "0 0 6px rgba(77,56,29,0.7)",
              },
            }}
          >
            Click Pictures
          </Button>
          <Button
            variant="contained"
            onClick={handleUploadPictures}
            sx={{
              backgroundColor: "#4B3621",
              color: "#E5D2B8",
              fontWeight: "400",
              fontFamily: "'Modeka', cursive",
              fontSize: "1rem",
              textTransform: "none",
              px: 2.5,
              py: 0.6,
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#5D3E1F",
                color: "#fff",
                boxShadow: "0 0 6px rgba(77,56,29,0.7)",
              },
            }}
          >
            Upload Pictures
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
