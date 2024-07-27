import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import './style3.css'
import work from './images/work4.png'



function Sidebar(){
    return(
        <div className='d-flex justify-content-between flex-column  text-White p-3 vh-100 ' style={{ backgroundColor: 'rgba(0,0,0,0.55)  ', boxShadow: '2px 6px 5px rgba(0, 0, 0, 9)', background: '#013237' }}>
            <div>
            <img src={work} alt="work" />
    
                
                
                <hr className='text-secondary mt-2' />
                <ul className="nav nav-pills flex-column mt-2">
                    <li className="nav-item p-2 m-3 home">
                        <Link to="/afficher" className="p-1 " style={{ color: 'white', textDecoration: 'none', padding: '10%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
                            <i className='bi bi-card-checklist me-3 fs-5'></i>
                            <span className="fs-5" >Produit</span>
                        </Link>
                    </li>
                    <li className="nav-item p-2 m-1 home">
                        <Link to="/afficherfourni" className="p-1 " style={{ color: 'white', textDecoration: 'none', padding: '10%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
                            <i className='bi bi-person-plus me-3 fs-3'></i>
                            <span className="fs-5" >Fournisseur</span>
                        </Link>
                    </li>
                    <li className="nav-item p-2 m-1 home">
                        <Link to="/afficherculture" className="p-1 " style={{ color: 'white', textDecoration: 'none', padding: '10%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
                            <i className='bi bi-graph-up me-3 fs-3'></i>
                            <span className="fs-5" >culture</span>
                        </Link>
                    </li>
                    <li className="nav-item p-2 m-1 home">
                        <Link to="/afficherclient" className="p-1 " style={{ color: 'white', textDecoration: 'none', padding: '10%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
                            <i className='bi bi-graph-up me-3 fs-3'></i>
                            <span className="fs-5" >Client</span>
                        </Link>
                    </li>
                    <li className="nav-item p-2 m-1 home">
                        <Link to="/affichercommande" className="p-1 " style={{ color: 'white', textDecoration: 'none', padding: '10%', transition: 'color 0.3s' }} hover={{ color: 'black', backgroundColor: 'initial' }}>
                            <i className='bi bi-graph-up me-3 fs-3'></i>
                            <span className="fs-5" >Commande</span>
                        </Link>
                    </li>


                    



                  
                </ul>
            </div>
            <div>
                <hr className="text-secondary" />
                <div className="nav-item p-2" >
                              <button className=" nav-item p-2 m-3 home">NODE</button>
            </div>

            </div>

        </div>

    );

}

export default Sidebar;