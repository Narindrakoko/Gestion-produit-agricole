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

export default function EditFournisseur ({ fid, CloseEvent }) {
  const [idfourni, setIdFourni] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [contact, setContact] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { dopen, updateOpen } = UseAppStore();

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

  useEffect(() => {
    console.log("ID: ", fid.idfourni);
    setIdFourni(fid.idfourni);
    setNom(fid.nom);
    setAdresse(fid.adresse);
    setContact(fid.contact);
  }, []);

  const editFounisseur = async () => {
    axios
      .put(`http://localhost:5000/modifierFournisseur/${fid.idfourni}`, {
        idfourni,
        nom,
        adresse,
        contact,
      })
      .then((res) => {
        console.log(res);
        navigate("/Fournisseur");
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
          Modifier Fournisseur
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
              label="Id Fournisseur"
              value={idfourni}
              onChange={handleIdFourniChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
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
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button
                endIcon={<ModeEditIcon />}
                variant="contained"
                color="success"
                onClick={editFounisseur}
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
