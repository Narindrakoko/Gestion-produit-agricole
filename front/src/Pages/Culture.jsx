import React from 'react';
import Sidenav from '../Components/Sidenav';
import Navbar from '../Components/Navbar';
import CultureList from './Culture/CultureList';
import Box from "@mui/material/Box";
import "../Dash.css";

const Culture = () => {
    return (
        < >
          <div className='bgcolor'>
          <Navbar />
          <Box height={70} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <CultureList />
          </Box>
          </Box>
          </div>
        </ >
    );
};

export default Culture;