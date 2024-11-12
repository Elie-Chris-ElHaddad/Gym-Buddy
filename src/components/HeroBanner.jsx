import { Box, Button, Stack, Typography } from "@mui/material";
import { createTheme, getContrastRatio, ThemeProvider } from "@mui/material/styles";
import React from "react";

import HeroBannerImage from "../assets/assets/images/Gym-guy.png";

// Custom theme for styling the 'Browse Exercises' button with a custom color palette
const theme = createTheme({
    palette: {
      custom: { 
        main: "#FF5733",      // Main button color
        light: "#FF5733",     // Light variant
        dark: "#FF5733",      // Dark variant
        contrastText: "#FFF", // Text color on button
      },
    },
  });

/**
 * HeroBanner component for displaying a hero section with a title, subtitle,
 * button, and an image.
 * 
 * @returns {JSX.Element} The rendered HeroBanner component.
 */
const HeroBanner = () => {
  return (
    <Box
      sx={{ mt: { lg: "212px", xs: "70px" }, ml: { sm: "50px" } }} // Responsive margin settings
      position="relative"
      p="20px"
    >
      {/* Title text */}
      <Typography color="darkcyan" fontWeight="700" fontSize="30px" ml={-5} mb={2}>
        My Gym Buddy
      </Typography>
      
      {/* Main headline with responsive font size */}
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "40px" } }} 
        ml={-5}
      >
        Unlock Your Strength
        <br /> Anytime, Anywhere
      </Typography>
      
      {/* Subtitle text with descriptive message */}
      <Typography fontSize="22px" lineHeight="35px" mb={3} ml={-5}>
        Check out our most effective exercises!
      </Typography>

      {/* Button with custom theme styling to link to exercises section */}
      <ThemeProvider theme={theme}>
        <Button 
          href="#exercises" 
          color="custom" 
          variant="contained" 
          size="large" 
          sx={{ padding: '10px', ml: '-39px' }}
        >
          Browse Exercises
        </Button>
      </ThemeProvider>

      {/* Hero image background */}
      <img src={HeroBannerImage} alt="banner" className="hero-banner-img"/>
    </Box>
  );
};

export default HeroBanner;
