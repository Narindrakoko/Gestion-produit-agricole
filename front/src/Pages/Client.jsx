import React from 'react';
import Sidenav from '../Components/Sidenav';
import Navbar from '../Components/Navbar';
import ClientList from './Client/ClientList';
import Box from "@mui/material/Box";
import "../Dash.css";
  
  const Client = () => {
    return (
        < >
          <div className='bgcolor'>
          <Navbar />
          <Box height={70} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <ClientList />
          </Box>
          </Box>
          </div>
        </ >
    );
  };
  
  export default Client;