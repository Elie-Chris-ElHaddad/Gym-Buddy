import { Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink} from 'react-router-hash-link'

import Logo from '../assets/assets/images/Logo.png';

const Navbar = () => {
  return (
    // Main container for the navbar with responsive gap and margin
    <Stack direction="row" justifyContent="space-around" sx={{ gap: {sm:'122px' , xs:'40px'}, mt: {sm:'32px', xs:'20px'}, justifyContent:'none' }} px="20px">
        {/* Logo link, which navigates to the home page */}
        <Link to="/">
          <img src={Logo} alt="logo" style={{width:'60px', margin:'0,20px'}}/>
        </Link>
        
        {/* Navigation links with styling and spacing */}
        <Stack direction="row" gap="20px" fontSize="15px" alignItems="flex-end" style={{ margin:'20px'}}>
          {/* Home link with an active style for the border */}
          <Link to="/" style={{textDecoration:'none', color:'black', borderBottom:'3px solid red'}} >Home</Link>
          {/* Exercises link with no underline decoration */}
          <HashLink to="/#exercises" style={{textDecoration:'none', color:'black'}}>Exercises</HashLink>
          {/* Schedule link, navigates to the schedule page */}
          <Link to="/schedule" style={{textDecoration:'none', color:'black'}}>Schedule</Link>
          {/* Shop link, navigates to the shop page */}
          <Link to="/shop" style={{textDecoration:'none', color:'black'}}>Shop</Link>
        </Stack>
    </Stack>
  );
}

export default Navbar;
