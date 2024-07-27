import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Sidenav from "../Components/Sidenav";
import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";
import "../Dash.css";
import Image1 from "../image/image1.jpg";
import Image2 from "../image/image2.jpg";
import Image4 from "../image/image4.jpg";
import Image5 from "../image/image5.jpg";
import Image6 from "../image/image6.jpg";
import Image7 from "../image/image7.jpg";
import Image8 from "../image/image8.jpg";
import {  useEffect,useState } from "react";
import axios from "axios";

const Acceuil = () => {

  const [userData, setUserData] = useState(null);
useEffect(() => {
  axios.get('http://localhost:8081/admin')
    .then(res => {
      if(res.data.valid){
          setUserData(res.data);
         
        
      } else {
          console.log(res)
          navigate('/login')// Redirection vers la page de connexion si l'utilisateur n'est pas valide
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      alert("Erreur lors de la récupération des données utilisateur");
      // Gérer les erreurs de récupération des données utilisateur
    });
}, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="bgcolor">



        <Navbar />

   
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                 
      <h3 style={{ textAlign: 'center' }}>Bienvenue dans <span style={{ color: '#217e38' }}>AgriG</span></h3>
                    <h6 style={{ textAlign: 'center' }}>Un plateforme en ligne pour faire des commandes de produit agricole</h6>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={Image1}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Culture
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {
                  navigate("/Culture");
                }}>
                  Visiter
                </Button>
              </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={Image2}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Produit
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {
                  navigate("/Produit");
                }}>
                  Visiter
                </Button>
              </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={Image4}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Client
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {
                  navigate("/Client");
                }}>
                  Visiter
                </Button>
              </CardActions>
                </Card>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={Image8}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Commande
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {
                  navigate("/Commande");
                }}>
                  Visiter
                </Button>
              </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={Image7}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Stock
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {
                  navigate("/Stock");
                }}>
                  Visiter
                </Button>
              </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={Image6}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Exemple
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Visiter
                </Button>
              </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Acceuil;
