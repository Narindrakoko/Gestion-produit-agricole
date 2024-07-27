import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "./image/logo1.png";
import { Link } from "react-router-dom";

const Login2 = () => {
  const [idcli, setIdcli] = useState("");
  const [mdp, setMdp] = useState("");
  const [formValidEmail, setFormValidEmail] = useState(true);
  const [formValidPassword, setFormValidPassword] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setIdcli(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setMdp(event.target.value);
  };

  const navigation = () => {
    navigate("/Signup");
  };

  const handleIncorrectPassword = () => {
    // Mettre à jour l'état pour activer l'erreur et afficher le texte d'aide
    setIdcli("");
    setMdp(""); // Effacer la valeur actuelle pour déclencher l'erreur
    setFormValidEmail(false);
    setFormValidPassword(false); // Mettre à jour l'état pour activer l'erreur d'email
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!idcli || !mdp) {
      setFormValidEmail(false);
      setFormValidPassword(false);
    } else {
      setFormValidEmail(true);
      setFormValidPassword(true);
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:8081/login", { idcli, mdp })
        .then((res) => {
          if (res.data.login) {
            navigate("/content");
          } else {
            handleIncorrectPassword();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=" justify-content-center align-items-center"
      >
        <div>
          <form>
            <Box
              display={"flex"}
              flexDirection={"column"}
              maxWidth={400}
              alignItems={"center"}
              justifyContent={"center"}
              margin={"auto"}
              marginTop={5}
              padding={3}
              borderRadius={5}
              boxShadow={"5px 5px 10px #ccc"}
              sx={{
                ":hover": {
                  boxShadow: "10px 10px 20px #ccc",
                },
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "30vh", height: "15vh" }}
              />
              <Typography variant="h5" padding={1} textAlign={"center"}>
                <i className="bi bi-person-circle me-3 fs-3"></i>
                <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Client
                </span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                  <TextField
                    id="outlined-basic"
                    label="Nom d'utilisateur"
                    type="text"
                    value={idcli}
                    color="success"
                    onChange={handleEmailChange}
                    variant="outlined"
                    size="normal"
                    sx={{ minWidth: "80%" }}
                    placeholder="***@gmail.com"
                    error={!formValidEmail && !idcli}
                    helperText={
                      formValidEmail || idcli
                        ? ""
                        : "Email manquant ou invalide"
                    }
                  />
                </Grid>
                <Grid item xs={12} align="center">
                  <TextField
                    id="outlined-basic"
                    label="Mots de passe"
                    type="password"
                    color="success"
                    value={mdp}
                    onChange={handlePasswordChange}
                    variant="outlined"
                    size="normal"
                    sx={{ minWidth: "80%" }}
                    placeholder="****"
                    error={!formValidPassword && !mdp}
                    helperText={
                      formValidPassword || mdp
                        ? ""
                        : "Mots de Passe manquant ou incorrecte"
                    }
                  />
                </Grid>
                <Link style={{ marginLeft: "58%", fontSize: "0.8rem" }}>
                  Mot de passe oublié
                </Link>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    <Button
                      onClick={handleSubmit}
                      sx={{ marginTop: 1, borderRadius: 3, minWidth: "80%" }}
                      variant="contained"
                      color="success"
                      className="bt6"
                    >
                      Connexion
                    </Button>
                  </Typography>
                  <Typography variant="h5" align="center">
                    <Button
                      onClick={navigation}
                      sx={{
                        marginTop: 1,
                        borderRadius: 3,
                        minWidth: "80%",
                        color: "#2C2D30",
                      }}
                      className="bt5"
                    >
                      S'Inscrire
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login2;
