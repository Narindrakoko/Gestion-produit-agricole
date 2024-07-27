import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import leaf from './sary/leaf.png'
import tropical from './sary/logo1.png'
import './style3.css'
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';
import axios from 'axios';

function Sidebar0(){


  const navigate = useNavigate();
  const [rowCount, setRowCount] = useState(null);
  const [rowCount1, setRowCount1] = useState(null);
  const [rowCount2, setRowCount2] = useState(null);
  const [rowCount3, setRowCount3] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer le nombre de lignes depuis l'API
    const fetchRowCount = async () => {
      try {
        const response = await axios.get('http://localhost:8081/nombrelegume');
        setRowCount(response.data.rowCount);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de lignes : ', error);
      }
    };

    // Appel de la fonction pour récupérer le nombre de lignes au chargement du composant
    fetchRowCount();
  }, []); 


  useEffect(() => {
    // Fonction pour récupérer le nombre de lignes depuis l'API
    const fetchRowCount = async () => {
      try {
        const response = await axios.get('http://localhost:8081/nombrefruit');
        setRowCount1(response.data.rowCount1);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de lignes : ', error);
      }
    };

    // Appel de la fonction pour récupérer le nombre de lignes au chargement du composant
    fetchRowCount();
  }, []); 


  useEffect(() => {
    // Fonction pour récupérer le nombre de lignes depuis l'API
    const fetchRowCount = async () => {
      try {
        const response = await axios.get('http://localhost:8081/nombrelegumineuse');
        setRowCount2(response.data.rowCount2);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de lignes : ', error);
      }
    };

    // Appel de la fonction pour récupérer le nombre de lignes au chargement du composant
    fetchRowCount();
  }, []); 


  useEffect(() => {
    // Fonction pour récupérer le nombre de lignes depuis l'API
    const fetchRowCount = async () => {
      try {
        const response = await axios.get('http://localhost:8081/nombreautre');
        setRowCount3(response.data.rowCount3);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de lignes : ', error);
      }
    };

    // Appel de la fonction pour récupérer le nombre de lignes au chargement du composant
    fetchRowCount();
  }, []); 



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

    return(
        <div className='d-flex justify-content-between flex-column  text-White p-3 vh-100 ' style={{ backgroundColor: 'rgba(0,0,0,0.55)  ', background:'white' }}>
            <div>
            <img src={tropical} alt="tropical"  style={{width:'25vh' , height:'15vh'}}/>
                
                <hr className='text-secondary ' />
                <ul className="nav nav-pills flex-column">

                  <li className="nav-item p-2 m-3 ">
                        <Link to="/content" className="p-1 " style={{ color: 'black', textDecoration: 'none', padding: '2%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
                         
                            <span className="fs-5" style={{fontWeight:'bold'}}>Catégories</span>
                        </Link>
                        <ul>
                        <li className="nav-item p-1 m-1 home">
                        <Link to="/afficher" className="p-1 " style={{ color: '#2C2D30', textDecoration: 'none', padding: '5%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
                   
                            <span className="fs-6" >Legume</span>
                        </Link>
                    </li>
                    <li className="nav-item p-1 m-1 home">
                        <Link to="/afficherfruit" className="p-1 " style={{ color: '#2C2D30', textDecoration: 'none', padding: '5%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
            
                            <span className="fs-6" >Fruit</span>
                        </Link>
                    </li>
                    <li className="nav-item p-1 m-1 home">
                        <Link to="/afficherlegumineuse" className="p-1 " style={{ color: '#2C2D30', textDecoration: 'none', padding: '5%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>

                            <span className="fs-6" >Légumineuse</span>
                        </Link>
                    </li>
                    <li className="nav-item p-1 m-1 home">
                        <Link to="/afficherautre" className="p-1 " style={{ color: '#2C2D30', textDecoration: 'none', padding: '10%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>

                            <span className="fs-6" >Autre</span>
                        </Link>
                    </li>
                   
                        </ul>
                    </li> 
                </ul>
                <hr className='text-secondary' />
                <ul className="nav nav-pills flex-column ">

<li className="nav-item p-2 m-3 " >
      <Link to="" className="p-1 " style={{ color: 'black', textDecoration: 'none', padding: '10%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
       
          <span className="fs-6" style={{fontWeight:'bold'}}>Effectif des produits</span>
      </Link>
      </li>


      <ListGroup as="ol" numbered>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">légumes</div>
          <span style={{color:'#217e38'}}>{rowCount}  types de légumes</span>
        </div>
 
       
      
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Fruis</div>
          <span style={{color:'#217e38'}}>{rowCount1}  types de fruit</span>
        </div>
     {/*<Badge bg="success" pill>
        {rowCount1}
        </Badge> */}   
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Légumineuses</div>
          <span style={{color:'#217e38'}}>{rowCount2} Légumineuses</span>
        </div>
     
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Autres</div>
          <span style={{color:'#217e38'}}> {rowCount3 }autres types</span>
        </div>
    
      </ListGroup.Item>
    </ListGroup>




      </ul>
            </div>
            <div>
                <hr className="text-secondary" />

            </div>

        </div>

    );

}

export default Sidebar0;