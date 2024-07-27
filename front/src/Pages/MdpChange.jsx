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
import { UseAppStore } from '../AppStore';

export default function Editmdp  ({ fid, CloseEvent }) {
    const [idlog, setIdlog] = useState("");
    const [idnew, setNew] = useState("");
    const [idnew1, setNew1] = useState("");
    const [mdp, setMdp] = useState("");
   
    const { id } = useParams();
    const navigate = useNavigate();

    const { dopen, updateOpen } = UseAppStore();
 

    const handleIdProdChange = (event) => {
      setIdlog(event.target.value);
    };
    const handleProdChange = (event) => {
      setNew(event.target.value);
    };
    const handleDescriChange = (event) => {
      setNew1(event.target.value);
    };
   



 

  function EditProduit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/modifiemdp/${id}`, { idlog, mdp})
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
              label="Utilisateur"
              value={idlog}
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
              label="Ancien mot de passe"
              value={mdp}
              onChange={handleProdChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
    
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="nouveau mot de passe"
              value={idnew}
              onChange={handleDescriChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
          
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-basic"
              label="Confirmer mot de passe"
              type="text"
              value={idnew1}
              onChange={handleDescriChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              placeholder="Completer le champs"
             
            />
          </Grid>
         
        </Grid>
        <Box sx={{ m: 4 }} />
      </div>
        </div>
    );
};
