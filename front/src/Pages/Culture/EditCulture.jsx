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

export default function EditCulture ({ fid, CloseEvent }) {
  const [idprod, setIdProd] = useState("");
  const [nom, setNom] = useState("");
  const [date_semi, setDate_semi] = useState("");
  const [date_recolte, setDate_recolte] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { dopen, updateOpen } = UseAppStore();

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

  useEffect(() => {
    console.log("ID: ", fid.idcult);
    setIdProd(fid.idprod);
    setNom(fid.nom);
    setDate_semi(fid.date_semi);
    setDate_recolte(fid.date_recolte);
  }, []);

  const editCulture = async () => {
    axios
      .put(`http://localhost:5000/modifierCulture/${fid.idcult}`, {
        idprod,
        nom,
        date_semi,
        date_recolte,
      })
      .then((res) => {
        console.log(res);
        navigate("/Culture");
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
          Modifier Culture
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
              label="Date Semi"
              value={date_semi}
              onChange={handleDateSemiChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Date Recolte"
              value={date_recolte}
              onChange={handleDateRecolteChange}
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
                onClick={editCulture}
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

