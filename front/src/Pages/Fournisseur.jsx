import React from 'react';
import Sidenav from '../Components/Sidenav';
import Navbar from '../Components/Navbar';
import FournisseurList from './Fournisseur/FournisseurList';
import Box from "@mui/material/Box";
import "../Dash.css";

const Fournisseur = () => {
    return (
        < >
          <div className='bgcolor'>
          <Navbar />
          <Box height={70} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <FournisseurList />
          </Box>
          </Box>
          </div>
        </ >
    );
};

export default Fournisseur;