import { Box, Button, Stack, Typography } from "@mui/material";
import { createTheme, getContrastRatio, ThemeProvider } from "@mui/material/styles";
import React from "react";

import HeroBannerImage from "../assets/assets/images/banner.png";

const theme = createTheme({
    palette: {
      custom: { 
        main: "#FF5733",
        light: "#FF5733",
        dark: "#FF5733",
        contrastText: "#FFF",
      },
    },
  });

const HeroBanner = () => {
  return (
    <Box
      sx={{ mt: { lg: "212px", xs: "70px" }, ml: { sm: "50px" } }}
      position="relative"
      p="20px"
    >
      <Typography color="darkcyan " fontWeight="700" fontSize="30px" ml={-5} mb={2}>
        My Gym Budy
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "40px" } }} ml={-5}
      >
        Unlock Your Strength
        <br /> Anytime, Anywhere
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={3} ml={-5}>
        Check out our most effective exercises!
      </Typography>
      <ThemeProvider theme={theme}>
      <Button href="#exercises" color="custom" variant="contained" size="large" sx={{padding:'10px',ml:'-39px'}}>
        Browse Exercises
      </Button>
      </ThemeProvider>
      {/* <Typography fontweight={600} color="#ff2625" sx={{opacity:0.1,display:{lg:'block',xs:'none'}}} fontsize="600px">My Gym Buddy</Typography> */}
      <img  src={HeroBannerImage} alt="banner" className="hero-banner-img"/>
    
    </Box>
  );
};



export default HeroBanner;
