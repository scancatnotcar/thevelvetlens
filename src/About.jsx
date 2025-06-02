import React from "react";
import Navbar from "./Navbar";
import { Box, Typography, GlobalStyles } from "@mui/material";
import bgImage from "./images/2.jpg"; // import image from src/images folder

const AboutUs = () => {
  return (
    <>
      <GlobalStyles
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script&display=swap');
        `}
      />
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#E5E0D8",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "rgba(229, 224, 216, 0.8)",
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            maxWidth: 700,
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              opacity: 0.1,
              borderRadius: 4,
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 400,
              color: "#4B3621",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              position: "relative",
              zIndex: 2,
            }}
          >
            About 
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "1.5rem",
              color: "#725C3A",
              lineHeight: 1.8,
              maxWidth: 600,
              margin: "0 auto",
              position: "relative",
              zIndex: 2,
            }}
          >
           Welcome to Velvet Lens! I have built this application to help you create stunning polaroids that bring your favorite memories to life. Whether you’re into vintage charm or timeless edits, this platform makes it easy and enjoyable. Give it a try and let me know your thoughts — your feedback means a lot!




          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
