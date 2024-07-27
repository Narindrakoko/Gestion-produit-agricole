import React from 'react';
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAppStore } from '../../AppStore';
import "../../Dash.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const options = [
  { value: 'légume', label: 'Légume' },
  { value: 'fruit', label: 'Fruit' },
  { value: 'légumineuse', label: 'Légumineuse' },
  { value: 'autre', label: 'Autre' },
];


export default function AddProduit ({ CloseEvent }) {
  const [idprod, setIdProd] = useState("");
  const [prod, setProd] = useState("");
  const [descri, setDescri] = useState("");
  const [qt, setQt] = useState("");
  const [daty, setDaty] = useState();
  const [prix, setPrix] = useState("");
  const [formValid, setFormValid] = useState(true);
  const setUser = UseAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleIdProdChange = (event) => {
    setIdProd(event.target.value);
  };
  const handleProdChange = (event) => {
    setProd(event.target.value);
  };
  const handleDescriChange = (event) => {
    setDescri(event.target.value);
  };
  const handleQtChange = (event) => {
    setQt(event.target.value);
  };
  const handleDatyChange = (event) => {
    setDaty(event.target.value);
  };
  const handlePrixChange = (event) => {
    setPrix(event.target.value);
  };

  const createProduit = (event) => {
    event.preventDefault();

    if (!prod || !descri || !qt || !prix) {
      setFormValid(false);
    } else {
      setFormValid(true);
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:8081/ajoutProduit", { idprod, prod, descri, qt, daty, prix })
        .then((res) => {
          if (res.data.Status === "succes") {
            navigate('/Produit');
            CloseEvent();
            Swal.fire({
              icon: 'success',
              title: 'Ajouté',
              text: 'produit ajouté avec succès.',
              showConfirmButton: false, // Masquer le bouton de confirmation
              timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
              onBeforeOpen: () => {
                Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
              },
              onClose: () => {
                // Cette fonction sera appelée lorsque la boîte de dialogue se ferme
                // Vous pouvez ajouter du code ici si nécessaire
              }
            });
  
  
  
  
       
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Duplication de produit.',
              showConfirmButton: false, // Masquer le bouton de confirmation
              timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
              onBeforeOpen: () => {
                Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
              },
              onClose: () => {
                // Cette fonction sera appelée lorsque la boîte de dialogue se ferme
                // Vous pouvez ajouter du code ici si nécessaire
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Erreur!", "Votre Information est incomplète", "error");
        });
    }
  };


  ////////////////////////////////////////////////////DROP DOWN ////////////////////////////////////////////////////////////////////////////////
// Déclarez l'état pour stocker la valeur sélectionnée
const [category, setCategory] = useState('');

// Gérez le changement de valeur du dropdown
const handleCategoryChange = (event) => {
  setCategory(event.target.value);
};

    return (
        <div>
            <div className="backdark">
        <Box sx={{ m: 2 }} className="backdark" />
        <Typography variant="h5" align="center">
          Ajout Produit
        </Typography>
        <IconButton
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={CloseEvent}
        >
          <CloseIcon />
        </IconButton>
        <Box height={20} />
        <Grid container spacing={2}>
          
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Produit"
              value={prod}
              onChange={handleProdChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !prod}
            />
          </Grid>
          <Grid item xs={6}>
          <Select
      value={descri}
      onChange={ handleDescriChange }
      displayEmpty
      variant="outlined"
      fullWidth
      sx={{ minWidth: "100%" }}
      error={!formValid && !descri}
    >
      <MenuItem value="" disabled>
        Sélectionner une catégorie
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-basic"
              label="Quantité"
              type="number"
              value={qt}
              onChange={handleQtChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !qt}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              id="outlined-basic"
              label="Prix"
              value={prix}
              onChange={handlePrixChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !qt}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button
                endIcon={<HowToRegOutlinedIcon />}
                variant="contained"
                color="success"
                onClick={createProduit}
              >
                Enregistrer
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ m: 4 }} />
      </div>

        </div>
    );
};

 