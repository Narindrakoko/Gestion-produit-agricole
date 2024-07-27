import React from 'react';
import { motion } from "framer-motion"; // Importez motion

import './css/style.css';
import { Link } from 'react-router-dom';
import '../Trano.css'


import { Navbar, Nav, Container } from 'react-bootstrap';

import NavDropdown from 'react-bootstrap/NavDropdown';
import tropical from '../sary/logo1.png'



function About() {
  return (
    <div>

   
      
<div className='nav-before'></div>
     

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=' justify-content-center align-items-center'
      >

        <section id="newsletter">
          <div class="container">
            <h1>Application Gestion de Produit Agricole   - Projet IHM</h1>
            
          </div>
        </section>

        <section id="main">
          <div class="container">
            <article id="main-col">
              <h1 class="page-title">A propos</h1>
              <p>
              Bienvenue dans notre application de gestion agricole, votre solution complète pour 
              la gestion efficace de vos produits agricoles, de leur stockage à leur vente. Que vous soyez un petit agriculteur ou 
              une grande exploitation, notre plateforme intuitive vous permet de suivre et de gérer tous les aspects de votre activité 
              agricole en un seul endroit. Grâce à nos outils de gestion de stock avancés, vous pouvez surveiller avec précision vos niveaux 
              de produits, prévoir les besoins et éviter les pénuries. De plus, notre système de gestion des ventes vous permet de suivre vos transactions, de gérer vos clients 
              et de maximiser vos revenus. Simplifiez votre gestion agricole dès aujourd'hui avec notre application tout-en-un.
              </p>
              <p class="dark">
              Dans notre application, la gestion de stock est au cœur de votre efficacité opérationnelle. 
              Vous pouvez créer des fiches détaillées pour chaque produit agricole que vous gérez,
               y compris des informations telles que les quantités disponibles, les dates de péremption, les fournisseurs, 
               et bien plus encore. Grâce à des fonctionnalités avancées de suivi des stocks, vous pouvez surveiller en temps réel 
               les mouvements de vos produits, recevoir des alertes pour les niveaux bas et optimiser vos commandes en fonction de 
               la demande. De plus, notre système vous permet de visualiser des rapports détaillés sur l'état de votre stock, facilitant 
               ainsi la prise de décision et la planification stratégique pour votre exploitation agricole.

              </p>
            </article>

            <aside id="sidebar">
              <div class="dark">
                <h3>VENTE</h3>
                <p>Dans la section vente, notre application vous permet de gérer efficacement toutes vos transactions 
                  commerciales. Vous pouvez créer des factures et des bons de commande personnalisés, suivre les ventes
                   en temps réel, et gérer les paiements de manière transparente. De plus, vous pouvez analyser les données de vente
                   pour identifier les tendances et adapter votre stratégie de commercialisation pour maximiser vos revenus.
</p>
              </div>
            </aside>
          </div>
        </section>

     

      </motion.div>

    </div>
  );
}

export default About;
