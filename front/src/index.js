import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Cordo from './Home';
import Home from './Graph';
import Afficher from './produit/AfficherProd';
import EditPers from './produit/EditProd';
import Newcli from './produit/AjouterProd';
import Afficherfourni from './fournisseur/Afficher_fournisseur';
import EditFourni from './fournisseur/Edit_fourni';
import Newfourni from './fournisseur/Ajouter_fourni';
import Afficherclient from './client/Afficher_client';
import Newclient from './client/Ajouter_client';
import Editclient from './client/Edit_cli';
import Afficher_culture from './culture/Afficher_culture';
import Newculture from './culture/Ajouter_culture';
import Afficher_commande from './commande/Afficher_commande';
import Newcommande from './commande/Ajouter_commande';
import Editcom from './commande/Editcommande';
import Content from './Contenu';
import Content2 from './Contenu2';
import Content3 from './Contenu3';
import UserState from './User';


import Login from './Login/Login';
import Login2 from './Login';
import Signup from './Login/Signup';

import Acceuil from './Pages/Acceuil';
import Produit from './Pages/Produit'
import Client from './Pages/Client';
import Culture from './Pages/Culture';
import Commande from './Pages/Commande';
import Fournisseur from './Pages/Fournisseur';
import EditClient from './Pages/Client/EditClient';
import EditProduit from './Pages/Produit/EditProduit';
import EditCulture from './Pages/Culture/EditCulture';
import EditCommande from './Pages/Commande/EditCommande';
import EditFournisseur from './Pages/Fournisseur/EditFournisseur'
import Trano from './Trano';
import AfficherFruit from './produit/AfficheFruiit';
import AfficherLegumineuse from './produit/AfficherLegumineuse';
import AfficherAutre from './produit/AfficherAutre';
import Stockacc from './Pages/Stockaccuil';
import Historique from './Historique';
import Tout from './Tout';

import About from './about/about';

import Principal from './Principal';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <Routes>
      <Route exact path="/" element={<Tout />} />

   
          <Route path="/Acceuil"exact element={<Acceuil/>}></Route>
          <Route path="/Produit"exact element={<Produit/>}></Route>
          <Route path="/Stock"exact element={<Stockacc/>}></Route>
          <Route path="/Client"exact element={<Client/>}></Route>
          <Route path="/Culture"exact element={<Culture/>}></Route>
          <Route path="/Commande"exact element={<Commande/>}></Route>
          <Route path="/Fournisseur"exact element={<Fournisseur/>}></Route>
          <Route path="/modifierClient/:idcli" element={<EditClient />} /> 
          <Route path="/modifierProduit/:idpro" element={<EditProduit />} /> 
          <Route path="/modifierCulture/:idcult" element={<EditCulture />} /> 
          <Route path="/modifierCommande/:idcom" element={<EditCommande />} /> 
          <Route path="/modifierCommande/:idfourni" element={<EditFournisseur />} /> 
  
        <Route path="/" element={<Cordo />} >
            <Route path="/home" element={<Home />} />
            <Route path="/content" element={<Content />} />
            <Route path="/content2" element={<Content2 />} />
            <Route path="/content3" element={<Content3 />} />
            <Route path="/user" element={<UserState />} />
            <Route path="/historique" element={<Historique />} />


            <Route path="/afficher" element={<Afficher />} />
            <Route path="/afficherfruit" element={<AfficherFruit />} />
            <Route path="/afficherlegumineuse" element={<AfficherLegumineuse />} />
            <Route path="/afficherAutre" element={<AfficherAutre />} />


            <Route path="/edit_pers/:idprod" element={<EditPers />} />
            <Route path="/ajout" element={<Newcli />} />

            <Route path="/afficherfourni" element={<Afficherfourni />} />
            <Route path="/edit_fourni/:idfourni" element={<EditFourni />} />
            <Route path="/ajout_fourni" element={<Newfourni />} />

            <Route path="/afficherclient" element={<Afficherclient />} />
            <Route path="/ajout_cli" element={<Newclient />} />
            <Route path="/edit_cli/:idcli" element={<Editclient />} />

            <Route path="/afficherculture" element={<Afficher_culture />} />
            <Route path="/ajout_cult" element={<Newculture />} />

            <Route path="/affichercommande" element={<Afficher_commande />} />
            <Route path="/ajout_com" element={<Newcommande />} />
            <Route path="/edit_com/:idcom" element={<Editcom/>} />
        </Route>

        <Route path="/" element={<Tout />} >
            <Route path="/About1" element={<About />} />
            <Route path="/principal" element={<Principal />} />  
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/login2" element={<Login2 />} /> 
        </Route>

    


      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
