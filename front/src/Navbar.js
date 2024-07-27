


import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {  Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';
import leaf from './sary/leaf.png'
import Dropdown from 'react-bootstrap/Dropdown';
import './style3.css'
import { Link, useNavigate } from 'react-router-dom';
function Navbare({Toggle}) {



      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      const [show, setShow] = useState(false);

      const [userData, setUserData] = useState(null);
      const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => {
        if(res.data.valid){
            setUserData(res.data);
  
        } else {
            console.log(res)
            // Redirection vers la page de connexion si l'utilisateur n'est pas valide
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        alert("Erreur lors de la récupération des données utilisateur");
        // Gérer les erreurs de récupération des données utilisateur
      });
}, []);



const handleClose1 = () => setShowModal(false);


const handleClose2 = () => setShow(false);
  const handleShow2 = () => setShow(true);

const handleLogout = () => {
  // Afficher une boîte de dialogue de confirmation

      axios.get('http://localhost:8081/logout')
          .then(response => {
              // Si la déconnexion réussit, redirigez l'utilisateur vers la page de connexion ou effectuez d'autres actions nécessaires.
              console.log(response.data);
              navigate('/login2');
          })
          .catch(error => {
              // Si une erreur se produit lors de la déconnexion, gérez-la ici.
              console.error('Erreur lors de la déconnexion:', error);
          });

};
const navigate=useNavigate();

//////////////////////////////////changer mot de passe /////////////////////

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
  axios.post('http://localhost:8081/changement-mot-de-passe1', {
      idUtilisateur: userData.idcli, // Remplacez par l'identifiant de l'utilisateur
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


  return (
      <div >
      
        
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{marginRight:'10%'}}>
      <Container>
        <Navbar.Brand href="#home">
        <img src={leaf} alt="leaf"  />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Menu</Nav.Link>
            <Nav.Link href="#pricing">Vue</Nav.Link>
            <Nav.Link href="#pricing">Aides</Nav.Link>
            
          </Nav>
          <Nav>
          <Button variant="transparent" className='bt' >
          <Link to="/content" className='bt2'>
                     Accueil
                     </Link>
   
    </Button>
    <Button variant="transparent"   onClick={() => {
                  navigate("/historique");
                }}>
Historique
  
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
                    <Dropdown.Item href="" onClick={handleShow2}>Se déconnecter</Dropdown.Item>
                  
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
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <>
    <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bienvenue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userData && userData.valid && (
                        <div>
                    <span className='fw-bold'>Nom d'utilisateur :</span>  <br></br> {userData.idcli}<br></br> 
                     <span className='fw-bold'>Nom :</span>  <br></br> {userData.nom}<br></br> 
                     <span className='fw-bold'>Adresse Email :</span>  <br></br> {userData.adresse}<br></br> 
                     <span className='fw-bold'>Contacte :</span>  <br></br> {userData.contact}
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

</>



   </div>
     


     

  );
}

export default Navbare;
