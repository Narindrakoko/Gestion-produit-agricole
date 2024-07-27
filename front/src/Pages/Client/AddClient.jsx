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

export default function AddClient ({ CloseEvent }) {
  const [idcli, setIdCli] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [contact, setContact] = useState("");
  const [formValid, setFormValid] = useState(true);
  const setUser = UseAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleIdCliChange = (event) => {
    setIdCli(event.target.value);
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

  const createUser = (event) => {
    event.preventDefault();

    if (!idcli || !nom || !adresse || !contact ) {
      setFormValid(false);
    } else {
      setFormValid(true);

      axios
        .post("http://localhost:5000/ajoutClient", { idcli, nom, adresse, contact })
        .then((res) => {
          console.log(res);
          navigate("/Client");
          CloseEvent();
          Swal.fire(
            "Enregistrer!",
            "Votre Information a été bien Enregistrée",
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
          Ajout Client
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
              label="IdClient"
              value={idcli}
              onChange={handleIdCliChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !idcli}
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
          <Grid item xs={12}>
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

