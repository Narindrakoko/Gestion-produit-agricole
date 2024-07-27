import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// Assuming this is a custom CSS file for additional styling.
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion


function Newcli() {
  const [idprod, setId] = useState('');
  const [prod, setProd] = useState('');
  const [descri, setDescri] = useState('');
  const [qt, setQt] = useState('');
  const [daty, setDaty] = useState('');
  const [prix, setPrix] = useState('');


  const allerVers = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/inscription', { idprod, prod, descri, qt, daty, prix })
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Ajouté',
            text: 'produit ajouté avec succès.',
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


          

          allerVers('/afficher');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Le client existe déjà.',
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
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>

      <header>
        <div class="container">
          <div id="branding">
            <h1><span class="highlight">Produit</span></h1>

          </div>
          <nav>
            <ul>
              {/* 
              <li><Link to={`/`} className=' '>HOME</Link></li>
              <li><Link to={`/acc_services`} className=''>RAPPORT</Link></li>
              <li><Link to={`/acc_about`} className=''>ABOUT</Link></li>
              <li class="current"><Link to={`/login`} className=''>Login</Link></li>
              */}
            </ul>
          </nav>
        </div>
      </header>
      <div className='nav-before'></div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=' justify-content-center align-items-center'
      >

        <div className='p-5 d-flex justify-content-center align-items-center'>

          <div className='w-50 rounded p-4 shadow bg-opacity bg'>
            <h2>Ajouter un client</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Idprod">Numéro:</label>
                <input
                  type="text"
                  className="form-control"
                  id="idprod"
                  name="idprod"
                  value={idprod}
                  onChange={e => setId(e.target.value)}


                  aria-describedby="idprod"

                />
              </div>

              <div className="form-group">
                <label htmlFor="prod">Produit:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prod"
                  required
                  aria-describedby="prod"
                  value={prod} // Afficher l'ancienne valeur
                  onChange={e => setProd(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="descri">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="descri"
                  required
                  aria-describedby="descri"
                  value={descri} // Afficher l'ancienne valeur
                  onChange={e => setDescri(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="qt">Quantité:</label>
                <input
                  type="text"
                  className="form-control"
                  id="qt"
                  required
                  aria-describedby="qt"
                  value={qt} // Afficher l'ancienne valeur
                  onChange={e => setQt(e.target.value)}
                />
              </div>

             
              <div className="form-group">
                <label htmlFor="prix">Prix:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prix"
                  required
                  aria-describedby="prix"
                  value={prix} // Afficher l'ancienne valeur
                  onChange={e => setPrix(e.target.value)}
                />
              </div>



              <br />

              <button type='submit' className='btn btn-primary  shadow cover '>Enregistrer</button>

              <br />
              <br />
              <button onClick={
                () => window.history.back()
              } className="btn btn-success cover">
                Retour
              </button>

            </form>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default Newcli;
