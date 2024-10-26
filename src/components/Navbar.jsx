import React from 'react'
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

import Logo from '../assets/assets/images/Logo.png';

const Navbar = () => {
  return (
    <Stack direction="row" justifyContent="space-around" sx={{ gap: {sm:'122px' , xs:'40px'},mt: {sm:'32px',xs:'20px'}, justifyContent:'none'}}px = "20px">
        <Link to="/">
          <img src={Logo} alt="logo" style={{width:'60px', margin:'0,20px'}}/>
        </Link>
        <Stack direction="row" gap="20px" fontSize="15px" qlignItems="flex-end" style={{ margin:'20px'}}>
          <Link to="/" style={{textDecoration:'none', color:'black',borderBottom:'3px solid red'}} >Home</Link>
          <Link to="#exercises" style={{textDecoration:'none',color:'black'}}>Exercises</Link>
          <Link to="#schedule" style={{textDecoration:'none',color:'black'}}>Schedule</Link>
          <Link to="#shop" style={{textDecoration:'none',color:'black'}}>Shop</Link>
        </Stack>
    </Stack>
    )
}

export default Navbar