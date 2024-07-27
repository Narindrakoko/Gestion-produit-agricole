import React from 'react';

import './Trano.css'

import Choix from './Choix';
import Button from 'react-bootstrap/Button';

import { motion } from "framer-motion";

function Principal  ({Toggle})  {

    const [modalShow, setModalShow] = React.useState(false);
  return (
   
    <div className=' ' >


<motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=' justify-content-center align-items-center'
      >


<div className='texte'>
<h2 style={{ color: '#217e38' }}>BIENVENUE DANS AGPA</h2>
        <p >Une application web de gestion de produit agricole<br></br>
        Pour commencer veillez appuyer sur le bouton <span style={{ color: '#217e38' }}>commencer</span> <br></br>
        ou sur la bar de navigation </p>

        <>
      <Button variant="success" style={{fontSize:'1.7rem'}} onClick={() => setModalShow(true)}>
   Commencer
      </Button>

      <Choix
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
</div>
      

</motion.div>


    </div>
  
  );
};

export default Principal;