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

export default function AddCommande  ({ CloseEvent }) {
  const [idcom, setIdCom] = useState("");
  const [idcli, setIdCli] = useState("");
  const [idprod, setIdProd] = useState("");
  const [qt, setQt] = useState("");
  const [daty, setDaty] = useState("");
  const [formValid, setFormValid] = useState(true);
  const setUser = UseAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleIdComChange = (event) => {
    setIdCom(event.target.value);
  };
  const handleIdCliChange = (event) => {
    setIdCli(event.target.value);
  };
  const handleIdProdChange = (event) => {
    setIdProd(event.target.value);
  };
  const handleQtChange = (event) => {
    setQt(event.target.value);
  };
  const handleDateChange = (event) => {
    setDaty(event.target.value);
  };

  const createCommande = (event) => {
    event.preventDefault();

    if (!idcom|| !idcli || !idprod || !qt || !daty ) {
      setFormValid(false);
    } else {
      setFormValid(true);

      axios
        .post("http://localhost:5000/ajoutCommande", { idcom, idcli, idprod, qt, daty })
        .then((res) => {
          console.log(res);
          navigate("/Commande");
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
          Ajout Commande
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
              label="IdCommande"
              value={idcom}
              onChange={handleIdComChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !idcom}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="IdClient"
              value={idcom}
              onChange={handleIdCliChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !idcli}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="IdProduit"
              value={idprod}
              onChange={handleIdProdChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !idprod}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Quantité"
              value={qt}
              onChange={handleQtChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !qt}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Date"
              value={daty}
              onChange={handleDateChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !daty}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button
                endIcon={<HowToRegOutlinedIcon />}
                variant="contained"
                color="success"
                onClick={createCommande}
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
