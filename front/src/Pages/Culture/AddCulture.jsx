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

export default function AddCulture ({ CloseEvent }) {
  const [idprod, setIdProd] = useState("");
  const [nom, setNom] = useState("");
  const [date_semi, setDate_semi] = useState("");
  const [date_recolte, setDate_recolte] = useState("");
  const [formValid, setFormValid] = useState(true);
  const setUser = UseAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleIdprodChange = (event) => {
    setIdProd(event.target.value);
  };
  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handleDateSemiChange = (event) => {
    setDate_semi(event.target.value);
  };
  const handleDateRecolteChange = (event) => {
    setDate_recolte(event.target.value);
  };

  const createUser = (event) => {
    event.preventDefault();

    if (!idprod || !nom || !date_semi || !date_recolte ) {
      setFormValid(false);
    } else {
      setFormValid(true);

      axios
        .post("http://localhost:5000/ajoutCulture", { idprod, nom, date_semi, date_recolte })
        .then((res) => {
          console.log(res);
          navigate("/Culture");
          CloseEvent();
          Swal.fire(
            "Enregistrer!",
            "Les Informations ont été bien Enregistrée",
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Erreur!", "Votre Information est incomplète", "error");
        });
    }
  };


    return (
        <div>
            <div className="backdark">
        <Box sx={{ m: 2 }} className="backdark" />
        <Typography variant="h5" align="center">
          Ajout Culture
        </Typography>
        <IconButton
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={CloseEvent}
        >
          <CloseIcon />
        </IconButton>
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              label="Id Produit"
              value={idprod}
              onChange={handleIdprodChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !idprod}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label="Nom"
              value={nom}
              onChange={handleNomChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !nom}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type='date'
              value={date_semi}
              onChange={handleDateSemiChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !date_semi}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type='date'
              value={date_recolte}
              onChange={handleDateRecolteChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !date_recolte}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button
                endIcon={<HowToRegOutlinedIcon />}
                variant="contained"
                color="success"
                onClick={createUser}
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

