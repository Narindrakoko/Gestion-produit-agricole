import React from 'react';
import Sidenav from '../Components/Sidenav';
import Navbar from '../Components/Navbar';
import Stock from './Produit/Stock';
import Box from "@mui/material/Box";
import "../Dash.css";

const Stockacc = () => {
    return (
      < >
        <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Stock />
          </Box>
        </Box>
        </div>
      </ >
    );
};

export default Stockacc;