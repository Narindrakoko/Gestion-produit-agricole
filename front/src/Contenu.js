import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import legume from "./sary/legume1.jpg";
import legume2 from "./sary/legume2.jpg";
import petit from "./sary/legume3.jpg";
import vomaina from "./sary/legume4.jpg";
import tsaramaso from "./sary/legume6.jpg";
import haricotvert from "./sary/haricot.jpg";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Sidebar1 from "./Sidebar1";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { motion } from "framer-motion";
import Dropdown from "react-bootstrap/Dropdown";
import "./style3.css";

import jsPDF from "jspdf";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,

    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    fontSize: "10px",
    backgroundColor: "#dc3545",
  },
}));

const StyledBadge1 = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,

    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px",
    fontSize: "15px",
    backgroundColor: "#217e38",
  },
}));

function Content() {
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user profile data from the backend API
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.valid) {
          console.log("success du login");
        } else {
          console.log(res);
          navigate("/login2");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        alert("Error fetching user profile");
      });
  }, []);

  /////////////////////////////////////////////////////////////////ACHAT ACHAT////////////////////////////////////////////////////////////////////////

  const [show, setShow] = useState(false); // State pour afficher le modal d'ajout au panier
  const [confirmShow, setConfirmShow] = useState(false); // State pour afficher le modal de confirmation
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirmClose = () => {
    setConfirmShow(false);
    setSelectedProducts([]); // Réinitialiser le panier
  };

  /////////////////////////////////////////////////////////FONCTION CALCULE////////////////////////////////////////////////////////////////////////////////
  const countProductsInCart = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.quantite,
      0
    );
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
    setSelectedProducts([
      ...selectedProducts,
      {
        idproduit: product.idprod,
        idcli: userData.nom,
        produit: product.prod,
        quantite: quantity,
      },
    ]);
    handleClose();
  };

  const handleSubmit = () => {
    handleConfirmShow(); // Afficher le modal de confirmation
  };

  const confirmCommande = async () => {
    try {
      await axios.post(
        "http://localhost:8081/add_to_command",
        selectedProducts
      );
      setSelectedProducts([]);
      handleConfirmClose();
      generateInvoicePDF(userData, selectedProducts); // Passer les données utilisateur et les produits sélectionnés à la fonction
      Swal.fire({
        icon: "success",
        title: "Ajouté",
        text: "Commande ajoutée avec succès.",
        showConfirmButton: false,
        timer: 1500,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
        onClose: () => {
          // Code à exécuter lorsque la boîte de dialogue se ferme
        },
      });
    } catch (error) {
      console.error("Error submitting command:", error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////client//////////////////////////////////////////////////////////////////////////////////////

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        if (res.data.valid) {
          setUserData(res.data);
        } else {
          console.log(res);
          navigate('/login2')
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
        alert("Erreur lors de la récupération des données utilisateur");
        // Gérer les erreurs de récupération des données utilisateur
      });
  }, []);

  /////////////////////////////////////////////////////////////PDF PDF///////////////////////////////////////////////////////////////////////////////////////////

  const generateInvoicePDF = (userData, selectedProducts) => {
    const doc = new jsPDF();

    // Générer le contenu de la facture en utilisant les données utilisateur et les produits sélectionnés
    let invoiceContent = ` Facture \n`;
    invoiceContent += `                                                                             Date : ${new Date().toLocaleDateString()}\n`;
    invoiceContent += `                                                                             Client : ${userData.nom}\n`;
    invoiceContent += `Produits :\n`;
    selectedProducts.forEach((product, index) => {
      invoiceContent += `- ${product.produit} - Quantité : ${product.quantite}\n`;
    });
    invoiceContent += `Total : ${countProductsInCart()} produits\n`;

    // Ajouter le contenu de la facture au PDF
    doc.text(invoiceContent, 10, 10);

    // Télécharger le PDF
    doc.save("facture.pdf");
  };

  ///////////////////////////////////////////////////////////////////////////DONNER AVY AM BACKEND////////////////////////////////
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/produit1");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [user2, setUser2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/produit2");
        setUser2(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/produit0");
        setProduits(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAubergine = () => {
    // Handle Aubergine product
  };

  const handleHaricotVert = () => {
    // Handle Haricot Vert product
  };

  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col>
              <section className="available merriweather py-2">
                <div class="row">
                  <div style={{ marginBottom: "3%", marginTop: "1%" }}>
                    <h3 style={{ textAlign: "center" }}>
                      Bienvenue dans{" "}
                      <span style={{ color: "#217e38" }}>AgriG</span>
                    </h3>
                    <h6 style={{ textAlign: "center" }}>
                      Un plateforme en ligne pour faire des commandes de produit
                      agricole
                    </h6>

                    <div style={{ marginLeft: "85%" }}>
                      <IconButton aria-label="cart" onClick={handleSubmit}>
                        <StyledBadge
                          badgeContent={numberOfLines}
                          color="secondary"
                        >
                          <ShoppingCartIcon
                            style={{ fontSize: "6vh", color: "black" }}
                          />
                        </StyledBadge>
                      </IconButton>
                    </div>
                  </div>

                  <div
                    class="card mb-3 bg-transparent"
                    style={{ borderStyle: "none" }}
                  >
                    <div style={{ marginBottom: "2%" }}>
                      <Nav fill variant="tabs" defaultActiveKey="/content">
                        <Nav.Item className="ct1">
                          <Link
                            to="/content"
                            className="p-1 fs-4 "
                            style={{
                              color: "black",
                              background: "#217e38",
                              borderRadius: "3px",
                              textDecoration: "none",
                            }}
                          >
                            <span className="fs-5">Legumes</span>
                          </Link>
                        </Nav.Item>
                        <Nav.Item className="ct1">
                          <Link
                            to="/content2"
                            className="p-1 fs-4 "
                            style={{
                              color: "#2C2D30",
                              textDecoration: "none",
                              padding: "10%",
                              transition: "color 0.3s",
                            }}
                            hover={{
                              color: "black",
                              backgroundColor: "initial",
                            }}
                          >
                            <span className="fs-5">Fruits</span>
                          </Link>
                        </Nav.Item>
                        <Nav.Item className="ct1">
                          <Link
                            to="/content3"
                            className="p-1 fs-4"
                            style={{
                              color: "#2C2D30",
                              textDecoration: "none",
                              padding: "10%",
                              transition: "color 0.3s",
                            }}
                            hover={{
                              color: "black",
                              backgroundColor: "initial",
                            }}
                          >
                            <span className="fs-5">Légumineuses</span>
                          </Link>
                        </Nav.Item>
                        <Nav.Item className="ct1">
                          <Link
                            to="/afficherautre"
                            className="p-1 fs-4 "
                            style={{
                              color: "#2C2D30",
                              textDecoration: "none",
                              padding: "10%",
                              transition: "color 0.3s",
                            }}
                            hover={{
                              color: "black",
                              backgroundColor: "initial",
                            }}
                          >
                            <span className="fs-5">Autres</span>
                          </Link>
                        </Nav.Item>
                      </Nav>
                    </div>

                    <div class="row">
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className=" justify-content-center align-items-center"
                      >
                        <div class="row">
                          {produits.map((produit) => {
                            if (produit.prod === "Aubergine") {
                              return (
                                <Card
                                  style={{
                                    width: "15rem",
                                    marginInline: "4%",
                                    marginTop: "2%",
                                  }}
                                >
                                  <StyledBadge1
                                    badgeContent={produit.qt}
                                    color="secondary"
                                  ></StyledBadge1>
                                  <img src={legume} alt="Aubergine" />
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: "1.2rem" }}>
                                      {produit.prod}
                                    </Card.Title>
                                    <Card.Text>
                                      {produit.prix} ariary/KG
                                    </Card.Text>
                                    <Button
                                      style={{
                                        background: "transparent",
                                        backgroundColor: "transparent",
                                        color: "black",
                                        borderBlockColor: "green",
                                      }}
                                      onClick={() =>
                                        handleAddToCart({
                                          idprod: produit.idprod,
                                          prod: produit.prod,
                                          descri: produit.descri,
                                          prix: produit.prix,
                                        })
                                      }
                                    >
                                      <span>Acheter </span>
                                      <i className="bi bi-cart-plus text-success fs-6"></i>
                                    </Button>
                                  </Card.Body>
                                </Card>
                              );
                            } else if (produit.prod === "Haricot vert") {
                              return (
                                <Card
                                  style={{
                                    width: "15rem",
                                    marginInline: "4%",
                                    marginTop: "2%",
                                  }}
                                >
                                  <StyledBadge1
                                    badgeContent={produit.qt}
                                    color="secondary"
                                  ></StyledBadge1>
                                  <img src={haricotvert} alt="Haricotvert" />
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: "1.2rem" }}>
                                      {produit.prod}
                                    </Card.Title>
                                    <Card.Text>
                                      {produit.prix} ariary/KG
                                    </Card.Text>
                                    <Button
                                      style={{
                                        background: "transparent",
                                        backgroundColor: "transparent",
                                        color: "black",
                                        borderBlockColor: "green",
                                      }}
                                      onClick={() =>
                                        handleAddToCart({
                                          idprod: produit.idprod,
                                          prod: produit.prod,
                                          descri: produit.descri,
                                          prix: produit.prix,
                                        })
                                      }
                                    >
                                      <span>Acheter </span>
                                      <i className="bi bi-cart-plus text-success fs-6"></i>
                                    </Button>
                                  </Card.Body>
                                </Card>
                              );
                            } else if (produit.prod === "Courgette") {
                              return (
                                <Card
                                  style={{
                                    width: "15rem",
                                    marginInline: "4%",
                                    marginTop: "2%",
                                  }}
                                >
                                  <StyledBadge1
                                    badgeContent={produit.qt}
                                    color="secondary"
                                  ></StyledBadge1>
                                  <img src={petit} alt="Courgette" />
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: "1.2rem" }}>
                                      {produit.prod}
                                    </Card.Title>
                                    <Card.Text>
                                      {produit.prix} ariary/KG
                                    </Card.Text>
                                    <Button
                                      style={{
                                        background: "transparent",
                                        backgroundColor: "transparent",
                                        color: "black",
                                        borderBlockColor: "green",
                                      }}
                                      onClick={() =>
                                        handleAddToCart({
                                          idprod: produit.idprod,
                                          prod: produit.prod,
                                          descri: produit.descri,
                                          prix: produit.prix,
                                        })
                                      }
                                    >
                                      <span>Acheter </span>
                                      <i className="bi bi-cart-plus text-success fs-6"></i>
                                    </Button>
                                  </Card.Body>
                                </Card>
                              );
                            } else if (produit.prod === "Tomate") {
                              return (
                                <Card
                                  style={{
                                    width: "15rem",
                                    marginInline: "4%",
                                    marginTop: "2%",
                                  }}
                                >
                                  <StyledBadge1
                                    badgeContent={produit.qt}
                                    color="secondary"
                                  ></StyledBadge1>
                                  <img src={vomaina} alt="Tomate" />
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: "1.2rem" }}>
                                      {produit.prod}
                                    </Card.Title>
                                    <Card.Text>
                                      {produit.prix} ariary/KG
                                    </Card.Text>
                                    <Button
                                      style={{
                                        background: "transparent",
                                        backgroundColor: "transparent",
                                        color: "black",
                                        borderBlockColor: "green",
                                      }}
                                      onClick={() =>
                                        handleAddToCart({
                                          idprod: produit.idprod,
                                          prod: produit.prod,
                                          descri: produit.descri,
                                          prix: produit.prix,
                                        })
                                      }
                                    >
                                      <span>Acheter </span>
                                      <i className="bi bi-cart-plus text-success fs-6"></i>
                                    </Button>
                                  </Card.Body>
                                </Card>
                              );
                            } else if (produit.prod === "Choux") {
                              return (
                                <Card
                                  style={{
                                    width: "15rem",
                                    marginInline: "4%",
                                    marginTop: "2%",
                                  }}
                                >
                                  <StyledBadge1
                                    badgeContent={produit.qt}
                                    color="secondary"
                                  ></StyledBadge1>
                                  <img src={tsaramaso} alt="Choux" />
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: "1.2rem" }}>
                                      {produit.prod}
                                    </Card.Title>
                                    <Card.Text>
                                      {produit.prix} ariary/KG
                                    </Card.Text>
                                    <Button
                                      style={{
                                        background: "transparent",
                                        backgroundColor: "transparent",
                                        color: "black",
                                        borderBlockColor: "green",
                                      }}
                                      onClick={() =>
                                        handleAddToCart({
                                          idprod: produit.idprod,
                                          prod: produit.prod,
                                          descri: produit.descri,
                                          prix: produit.prix,
                                        })
                                      }
                                    >
                                      <span>Acheter </span>
                                      <i className="bi bi-cart-plus text-success fs-6"></i>
                                    </Button>
                                  </Card.Body>
                                </Card>
                              );
                            } else if (produit.prod === "Carotte") {
                              return (
                                <Card
                                  style={{
                                    width: "15rem",
                                    marginInline: "4%",
                                    marginTop: "2%",
                                  }}
                                >
                                  <StyledBadge1
                                    badgeContent={produit.qt}
                                    color="secondary"
                                  ></StyledBadge1>
                                  <img src={legume2} alt="carotte" />
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: "1.2rem" }}>
                                      {produit.prod}
                                    </Card.Title>
                                    <Card.Text>
                                      {produit.prix} ariary/KG
                                    </Card.Text>
                                    <Button
                                      style={{
                                        background: "transparent",
                                        backgroundColor: "transparent",
                                        color: "black",
                                        borderBlockColor: "green",
                                      }}
                                      onClick={() =>
                                        handleAddToCart({
                                          idprod: produit.idprod,
                                          prod: produit.prod,
                                          descri: produit.descri,
                                          prix: produit.prix,
                                        })
                                      }
                                    >
                                      <span>Acheter </span>
                                      <i className="bi bi-cart-plus text-success fs-6"></i>
                                    </Button>
                                  </Card.Body>
                                </Card>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>
            </Col>

            <Col xs lg="3">
              <div>
                <Sidebar1 />
              </div>
            </Col>
          </Row>
        </Container>
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
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAddToCartMultiple(selectedProduct)}
          >
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
              <li key={index}>
                {product.produit} - Quantité : {product.quantite}
              </li>
            ))}
            <li>Total : {numberOfLines} produits</li>
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
    </div>
  );
}

export default Content;
