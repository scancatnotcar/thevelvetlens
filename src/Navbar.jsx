import React from "react";
import { AppBar, Toolbar, IconButton, Link as MuiLink } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#E5E0D8", // light beige
      }}
    >
      <Toolbar
        sx={{
          marginLeft: "auto",
          gap: 4,
        }}
      >
        <MuiLink
          component={RouterLink}
          to="/"
          underline="none"
          sx={{
            color: "#725C3A",
            fontWeight: 500,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            "&:hover": { color: "#D2AB80" },
          }}
        >
          Home
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/aboutus"
          underline="none"
          sx={{
            color: "#725C3A",
            fontWeight: 500,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            "&:hover": { color: "#D2AB80" },
          }}
        >
          About
        </MuiLink>
        <IconButton
          component="a"
          href="https://www.instagram.com/scaniadsilva/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#725C3A" }}
          aria-label="Instagram"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/scania-dsilva-053a48288/" // Replace with your LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#725C3A" }}
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
