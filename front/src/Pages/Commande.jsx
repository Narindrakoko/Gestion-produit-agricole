import React from 'react';
import Sidenav from '../Components/Sidenav';
import Navbar from '../Components/Navbar';
import CommandeList from './Commande/CommandeList';
import Box from "@mui/material/Box";
import "../Dash.css";

const Commande = () => {
    return (
        < >
          <div className='bgcolor'>
          <Navbar />
          <Box height={70} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <CommandeList />
          </Box>
          </Box>
          </div>
        </ >
    );
};

export default Commande;