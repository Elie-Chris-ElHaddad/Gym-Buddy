import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './Styles/App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import Shop from './pages/Shop';
import Signup from './pages/Signup';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };
  
  const handleSignup = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <Box width="400px" sx={{width: {xl: '1488px' }}}m="auto">
      {isAuthenticated ? (
      <>
       <Navbar/>
       Welcome {user?.firstName} {user?.lastName}
        <Routes>
          <Route path="/home" element={<Home /> }/>
          <Route path="/exercise/:id" element={<ExerciseDetail />}/>
          <Route path="/schedule" element={<Schedule/>}/>
           <Route path="/shop" element={<Shop/>}/> 
        </Routes>
        <Footer/>
      </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          {/* Redirect to login as default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      </Box>
  )
}

export default App