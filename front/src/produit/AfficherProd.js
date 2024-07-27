import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import Swal from 'sweetalert2'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '10px',
    backgroundColor:'#dc3545',

    
  },
}));

function Afficher() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false); // State pour afficher le modal d'ajout au panier
  const [confirmShow, setConfirmShow] = useState(false); // State pour afficher le modal de confirmation
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8081/list_pers')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erreur au niveau de : ' + error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirmClose = () => {
    setConfirmShow(false);
    setSelectedProducts([]); // Réinitialiser le panier
  };


  /////////////////////////////////////////////////////////FONCTION CALCULE////////////////////////////////////////////////////////////////////////////////
  const countProductsInCart = () => {
    return selectedProducts.reduce((total, product) => total + product.quantite, 0);
  };

  const countLinesInCart = () => {
    return selectedProducts.length;
  };

  const numberOfLines = countLinesInCart();

  const numberOfProducts = countProductsInCart();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////FONCTION AFFICHER MODAL///////////////////////////////////////////////////////////////////////////////

  const handleConfirmShow = () => setConfirmShow(true);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    handleShow();
  };


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////FONCTION CONFIRMER MODAL////////////////////////////////////////////////////////////////////////////////
  const handleAddToCartMultiple = (product) => {
    setSelectedProducts([...selectedProducts, { idproduit: product.idprod,idcli:userData.nom, produit: product.prod, quantite: quantity }]);
    handleClose();
  };

  const handleSubmit = () => {
    handleConfirmShow(); // Afficher le modal de confirmation
  };

  const confirmCommande = async () => {
    try {
      await axios.post('http://localhost:8081/add_to_command', selectedProducts);
      setSelectedProducts([]);
      handleConfirmClose(); 
      Swal.fire({
        icon: 'success',
        title: 'Ajouté',
        text: 'Commande ajouté avec succès.',
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
    } catch (error) {
      console.error('Error submitting command:', error);
    }
  };
/////////////////////////////////////////////////////////////////////////////////////client//////////////////////////////////////////////////////////////////////////////////////

const [userData, setUserData] = useState(null);
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




  return (
    <div>
      <header>
        <div className="container">
          <nav>
            <ul>
            </ul>
          </nav>
        </div>
      </header>

      <div className="navleft p-3">
     
     {/* 
     <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className=' justify-content-center align-items-center'
        >
          <div>
          {selectedProducts.length > 0 && (
        <Button style={{background:'transparent' , backgroundColor:'transparent' , color:'black', borderBlockColor:'green'}} onClick={handleSubmit}>
         <i className='bi bi-cart-plus text-success fs-1'></i><Badge bg="danger">{numberOfLines}</Badge>
    
      </Button>
      )}

          </div>
      
      </motion.div>*/}
      
<div style={{marginLeft:'85%'}}>
<IconButton aria-label="cart" onClick={handleSubmit} >
      <StyledBadge badgeContent={numberOfLines} color="secondary">
        <ShoppingCartIcon style={{ fontSize:'6vh', color:'black' }}/>
      </StyledBadge>
    </IconButton>

</div>
      


      </div>

      <div className="navright">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className=' justify-content-center align-items-center'
        >
          <div className='w-30 rounded'>
            <div className='w-30 rounded '  style={{backgroundColor: 'rgba(0,0,0,0.55)  ',  marginLeft:'2%' ,  marginRight:'2%' }}>
              <table className=" table  table-striped">
                <thead  className='border'>
                  <tr>
                    <th>Produit</th>
                    <th>Description</th>
                    <th>Stocke</th>
                    <th>Prix</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.idprod}>
                      <td>{item.prod}</td>
                      <td>{item.descri}</td>
                      <td>{item.qt} kg</td>
                      <td>{item.prix} ariary/kg</td>
                      <td>
                        <button className='btn ms-2' onClick={() => handleAddToCart(item)}>
                          <i className='bi bi-cart-plus text-success fs-2'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter au panier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <p>Produit : {selectedProduct.prod}</p>
              <p>Description : {selectedProduct.descri}</p>
              <p>Prix unitaire : {selectedProduct.prix} ariary/kg</p>
              <Form.Group>
                <Form.Label>Quantité</Form.Label>
                <Form.Control type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={() => handleAddToCartMultiple(selectedProduct)}>
            Ajouter au panier
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={confirmShow} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de la commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment passer la commande suivante ?</p>
          <ul>
            {selectedProducts.map((product, index) => (
              <li key={index}>{product.produit} - Quantité : {product.quantite}</li>
            ))}
            <li>Total : {  numberOfLines} produits</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmCommande}>
            Confirmer la commande
          </Button>
        </Modal.Footer>
      </Modal>

   {/* {selectedProducts.length > 0 && (
        <Button variant="success" onClick={handleSubmit}>Passer la commande</Button>
      )} */}  
    </div>
  );
}

export default Afficher;
