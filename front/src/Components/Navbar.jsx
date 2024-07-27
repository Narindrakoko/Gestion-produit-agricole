import React from 'react';
import { UseAppStore } from '../AppStore';
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Swal from 'sweetalert2';
import {  useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dash.css";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {  Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

import { Link } from 'react-router-dom';

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Navbar  () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const updateOpen = UseAppStore((state) => state.updateOpen);
  const dopen = UseAppStore((state) => state.dopen);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const toggleDarkMode = UseAppStore((state) => state.toggleDarkMode);
  const darkMode = UseAppStore((state) => state.darkMode);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigation = () => {
    navigate("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={navigation}>Se Deconnecter</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  /////////////////////////////////////////////////////////nav show///////////////////

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose1 = () => setShowModal(false);


  const handleClose2 = () => setShow(false);
    const handleShow2 = () => setShow(true);

  const handleLogout = () => {
    // Afficher une boîte de dialogue de confirmation

        axios.get('http://localhost:8081/logout2')
            .then(response => {
                // Si la déconnexion réussit, redirigez l'utilisateur vers la page de connexion ou effectuez d'autres actions nécessaires.
                console.log(response.data);
                navigate('/login');
            })
            .catch(error => {
                // Si une erreur se produit lors de la déconnexion, gérez-la ici.
                console.error('Erreur lors de la déconnexion:', error);
            });
  
};

  
//////////////////////////////////////SESSION/////////////////////////
const [userData, setUserData] = useState(null);
useEffect(() => {
  axios.get('http://localhost:8081/admin')
    .then(res => {
      if(res.data.valid){
          setUserData(res.data);
         
        
      } else {
          console.log(res)
          navigate('/login')
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      alert("Erreur lors de la récupération des données utilisateur");
      // Gérer les erreurs de récupération des données utilisateur
    });
}, []);

/////////////////////////////////////CHANGER MOT DE PASSE///////////////////////

const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [showPasswordModal, setShowPasswordModal] = useState(false);
const handleClose3 = () => setShowPasswordModal(false);
const handleClose4 = () => setShowModal(false);

const handleOpenPasswordModal = () => {
  // Code pour ouvrir le modal de changement de mot de passe
  setShowPasswordModal(true);
};

const changer = () =>{
  handleOpenPasswordModal();
  handleClose1();
}


const handlePasswordChange = () => {
  // Envoyer la requête POST au backend pour changer le mot de passe
  axios.post('http://localhost:8081/changement-mot-de-passe', {
      idUtilisateur: userData.idlog, // Remplacez par l'identifiant de l'utilisateur
      motDePasseActuel: currentPassword,
      nouveauMotDePasse: newPassword
  })
  .then(response => {
      // Gérer la réponse réussie
      console.log(response.data.message); // Afficher un message de succès
      Swal.fire({
        icon: 'success',
        title: 'Mis à jour',
        text: 'Modification bien enregistre!',
        showConfirmButton: false, // Masquer le bouton de confirmation
        timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
        onBeforeOpen: () => {
          Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
        },
        onClose: () => {
          // Cette fonction sera appelée lorsque la boîte de dialogue se ferme
          // Vous pouvez ajouter du code ici si nécessaire
        }
      });
      setShowPasswordModal(false);
  })
  .catch(error => {
      // Gérer l'erreur
      console.error(error);
      // Afficher un message d'erreur à l'utilisateur, par exemple :
      alert('Une erreur s\'est produite lors du changement de mot de passe');
  });
};


//////////////////////////////////////RETURN//////////////////////////////////
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className="backdark">
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}
          className="backdark"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => updateOpen(!dopen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
             menu
            </Typography>
           
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                


            <Nav>
          <Button variant="transparent" className='bt' >
          <Link to="/Acceuil" className='bt2'>
                     Accueil
                     </Link>
   
    </Button>
    <Button variant="transparent">
     A propos
  
    </Button>
            <Nav.Link eventKey={2} href="">
                <Dropdown className='ct1'>
                  <Dropdown.Toggle style={{background:'transparent' , backgroundColor:'transparent' , borderStyle:'none' , color:'#2C2D30' }}>
                  <i className='bi bi-person-circle me-3 fs-2'></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="" >

                    <Button  onClick={handleShow} style={{background:'transparent' , backgroundColor:'transparent' , borderStyle:'none' , color:'#2C2D30' }}>
            Voir profil
            </Button>


                    </Dropdown.Item>
                    <Dropdown.Item  onClick={handleShow2}>Se déconnecter</Dropdown.Item>

                  
                  </Dropdown.Menu>
                </Dropdown>
          
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation de déconnexion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir vous déconnecter?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Se déconnecter
                    </Button>
                </Modal.Footer>
            </Modal>



            </Nav.Link>
          </Nav>




            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

      <Modal show={showModal} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Bienvenue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userData && userData.valid && (
                        <div>
                            <span className='fw-bold'>Nom d'utilisateur :</span><br />{userData.idlog}<br />
                            <span className='fw-bold'>Nom :</span><br />{userData.nom}<br />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {/* Votre bouton pour fermer le premier modal */}
                    <Button variant="secondary" onClick={handleClose1}>Fermer</Button>
                    {/* Bouton pour ouvrir le modal de changement de mot de passe */}
                    <Button variant="primary" onClick={changer}>Changer le mot de passe</Button>
                </Modal.Footer>
            </Modal>

            {/* Deuxième modal pour changer le mot de passe */}
            <Modal show={showPasswordModal} onHide={handleClose3}  centered>
                <Modal.Header closeButton>
                    <Modal.Title>Changer le mot de passe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {userData && userData.valid && (
                       <Form>
                       <Form.Group controlId="formCurrentPassword">
                           <Form.Label>Mot de passe actuel</Form.Label>
                           <Form.Control
                               type="password"
                               placeholder="Mot de passe actuel"
                               value={currentPassword}
                               onChange={(e) => setCurrentPassword(e.target.value)}
                           />
                       </Form.Group>
                       <Form.Group controlId="formNewPassword">
                           <Form.Label>Nouveau mot de passe</Form.Label>
                           <Form.Control
                               type="password"
                               placeholder="Nouveau mot de passe"
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                           />
                       </Form.Group>
                       <Form.Group controlId="formConfirmPassword">
                           <Form.Label>Confirmer le nouveau mot de passe</Form.Label>
                           <Form.Control
                               type="password"
                               placeholder="Confirmer le nouveau mot de passe"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                           />
                       </Form.Group>
                   </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose3}>Annuler</Button>
                    <Button variant="primary" onClick={handlePasswordChange}>Changer le mot de passe</Button>
                    {/* Vous pouvez ajouter ici votre bouton pour changer le mot de passe */}
                </Modal.Footer>
            </Modal>

    </div>
  );
};