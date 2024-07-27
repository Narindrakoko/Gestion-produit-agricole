import React from 'react';
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UseAppStore } from '../../AppStore';

const EditCommande = ({ fid, CloseEvent }) => {
  const [idcli, setIdCli] = useState("");
  const [idprod, setIdProd] = useState("");
  const [qt, setQt] = useState("");
  const [daty, setDaty] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { dopen, updateOpen } = UseAppStore();

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

  useEffect(() => {
    console.log("ID: ", fid.idcom);
    setIdCli(fid.idcli);
    setIdProd(fid.idprod);
    setQt(fid.qt);
    setDaty(fid.daty);
  }, []);

  const EditCommande = async () => {
    axios
      .put(`http://localhost:5000/modifierCommande/${fid.idcom}`, {
        idcli,
        idprod,
        qt,
        daty,
      })
      .then((res) => {
        console.log(res);
        navigate("/Commande");
        CloseEvent();
        Swal.fire(
          "Modifier!",
          "Les Information ont été bien Modifier",
          "success"
        );
        updateOpen(false);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Erreur!", "Votre Information est incomplète", "error");
      });
  };

    return (
        <>
        <Box sx={{ m: 2 }} />
        <Typography variant="h5" align="center">
          Modifier Commande
        </Typography>
        <IconButton
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={CloseEvent}
        >
          <CloseIcon />
        </IconButton>
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Id Client"
              value={idcli}
              onChange={handleIdCliChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="ID Produit"
              value={idprod}
              onChange={handleIdProdChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
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
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button
                endIcon={<ModeEditIcon />}
                variant="contained"
                color="success"
                onClick={EditCommande}
              >
                Modifier
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ m: 4 }} />
      </>
    );
};

export default EditCommande;