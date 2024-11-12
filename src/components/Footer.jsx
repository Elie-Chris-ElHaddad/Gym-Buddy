import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import Logo from '../assets/assets/images/Logo-1.png';

/**
 * Footer component that displays the logo and provides styling for the footer section.
 * 
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4">
      {/* Centered stack containing the logo */}
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        {/* Footer logo with specified dimensions */}
        <img src={Logo} alt="logo" width="200px" height="40px" />
      </Stack>
    </Box>
  );
};

export default Footer;
