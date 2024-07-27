import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Logo from "../image/logo1.png";

import { motion } from "framer-motion";

const Signup = () => {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formValidNom, setFormValidNom] = useState(true);
    const [formValidEmail, setFormValidEmail] = useState(true);
    const [formValidPassword, setFormValidPassword] = useState(true);
    const navigate = useNavigate();

    const handleNomChange = (event) => {
        setNom(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    function handleSubmit (event){
        event.preventDefault();
        if (!nom || !email|| !password ) {
            setFormValidNom(false);
            setFormValidEmail(false);
            setFormValidPassword(false);
        } else {
        setFormValidNom(true);
        setFormValidEmail(true);
        setFormValidPassword(true);
        axios.post('http://localhost:5000/inscription', {nom, email, password})
            .then((res) => {
                    console.log(res);
                    navigate('/');
            })
            .catch((err) => {
                    console.log(err);
            });
        }
    };
    
    const navigation = () => {
        navigate('/');
    };

    return (
        <div>
                 <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=' justify-content-center align-items-center'
      >
       <div>
            <form onSubmit={handleSubmit}>
            <Box 
                display={'flex'} 
                flexDirection={'column'} 
                maxWidth={400} alignItems={'center'} 
                justifyContent={'center'}
                margin={'auto'}
                marginTop={5}
                padding={3}
                borderRadius={5}
                boxShadow={'5px 5px 10px #ccc'}

                sx = {{":hover": {
                    boxShadow : '10px 10px 20px #ccc'
                }}}
            >
                <img
              src={Logo}
              alt="Logo"
              style={{ width: "300px", height: "100px" }}
            />
              <Typography variant="h5" padding={1} textAlign={"center"}>
                <i className='bi bi-person-plus me-3 fs-3 fw-bolder'></i>
                <span style={{fontSize:'1.3rem' ,fontWeight:'bold'}}>Inscription</span>
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} align="center">
                        <TextField id="outlined-basic" label="Nom" type={'text'} value={nom} onChange={handleNomChange} variant="outlined" size='normal' sx={{ minWidth: "80%" }} placeholder='Votre Nom' error={!formValidNom && !nom} helperText={formValidNom || nom? "" : "Nom manquant ou invalide"}/>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField id="outlined-basic" label="Email" value={email} onChange={handleEmailChange} variant="outlined" size='normal' sx={{ minWidth: "80%" }} placeholder='***@gmail.com' error={!formValidEmail && !email} helperText={formValidEmail || email? "" : "Email manquant ou invalide"}/>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField id="outlined-basic" label="Mots de passe" type='password' value={password} onChange={handlePasswordChange} variant="outlined" size='normal' sx={{ minWidth: "80%" }} placeholder='****' error={!formValidPassword && !password} helperText={formValidPassword || password? "" : "Mots de Passe manquant ou incorrecte"}/> 
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center"> 
                            <Button endIcon= { <HowToRegOutlinedIcon/>} onClick={handleSubmit} sx={{marginTop:1, borderRadius:3}} variant='contained' color='success'> Signup </Button>
                        </Typography>
                        <Typography variant="h5" align="center"> 
                            <Button endIcon= { <LoginOutlinedIcon/> } onClick={navigation} sx={{marginTop:1, borderRadius:3}} > Se connecter </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </form>
        </div>
        </motion.div>
        </div>
    );
};

export default Signup;