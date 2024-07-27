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

export default function AddFournisseur ({ CloseEvent }) {
  const [idfourni, setIdFourni] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [contact, setContact] = useState("");
  const [formValid, setFormValid] = useState(true);
  const setUser = UseAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleIdFourniChange = (event) => {
    setIdFourni(event.target.value);
  };
  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handleAdresseChange = (event) => {
    setAdresse(event.target.value);
  };
  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const createFournisseur = (event) => {
    event.preventDefault();

    if (!idfourni|| !nom || !adresse || !contact) {
      setFormValid(false);
    } else {
      setFormValid(true);

      axios
        .post("http://localhost:5000/ajoutFournisseur", { idfourni, nom, adresse, contact })
        .then((res) => {
          console.log(res);
          navigate("/Fournisseur");
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
          Ajout Fournisseur
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
              label="Id Fournisseur"
              value={idfourni}
              onChange={handleIdFourniChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !idfourni}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="IdClient"
              value={nom}
              onChange={handleNomChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !nom}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Adresse"
              value={adresse}
              onChange={handleAdresseChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !adresse}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Contact"
              value={contact}
              onChange={handleContactChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !contact}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button
                endIcon={<HowToRegOutlinedIcon />}
                variant="contained"
                color="success"
                onClick={createFournisseur}
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