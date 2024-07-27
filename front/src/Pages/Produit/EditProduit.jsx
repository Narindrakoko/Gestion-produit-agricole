import React from 'react';
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UseAppStore } from '../../AppStore';

export default function EditProduit  ({ fid, CloseEvent }) {
    const [idprod, setIdProd] = useState("");
    const [prod, setProd] = useState("");
    const [descri, setDescri] = useState("");
    const [qt, setQt] = useState("");
    const [daty, setDaty] = useState();
    const [prix, setPrix] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [formValid, setFormValid] = useState(true);
    const { dopen, updateOpen } = UseAppStore();
    const { idprod: personnelIm } = useParams(); 

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

  useEffect(() => {
    console.log("ID: ", fid.idprod);
    setIdProd(fid.idprod);
    setProd(fid.prod);
    setDescri(fid.descri);
    setQt(fid.qt);
    setDaty(fid.daty);
    setPrix(fid.prix);
  }, []);


 

  function EditProduit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/modifieProduit/${idprod}`, { idprod, prod, descri, qt, daty, prix})
      .then(res => {
        if (res.data.Status === "succes") {
          navigate("/Produit");
          CloseEvent();
          Swal.fire(
            "Enregistrer!",
            "Votre Information a été bien Enregistrée",
            "success"
          );
         
        } else {
          alert('Une erreur');
        }
      })
      .catch(err => console.log(err));
  }
    return (
        <div>
            <div className="backdark">
        <Box sx={{ m: 2 }} className="backdark" />
        <Typography variant="h5" align="center">
     Modifier produit
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
              label="IdProduit"
              value={idprod}
          
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
            <TextField
              id="outlined-basic"
              label="Description"
              value={descri}
              onChange={handleDescriChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
              error={!formValid && !descri}
            />
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
                onClick={EditProduit}
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
