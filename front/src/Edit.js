import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom"; // Utilisation de useParams pour récupérer le paramètre de l'URL
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion


function EditPers() {
  const [numCompte, setNum] = useState('');
  const [nom, setNom] = useState('');
  const [solde, setSolde] = useState('');

  const allerVers = useNavigate();
  const { num: personnelIm } = useParams(); // Récupérer l'IM depuis l'URL

  useEffect(() => {
    // Récupérer les anciennes valeurs du personnel à partir de la base de données
    axios.get(`http://localhost:8081/edit_pers/${personnelIm}`)
      .then(res => {
        if (res.data.Status === "succes") {
          const personnel = res.data.Personnel; // Assurez-vous que votre backend renvoie les anciennes valeurs
          setNum(personnel.numCompte);
          setNom(personnel.nom);
          setSolde(personnel.solde);
      
        } else {
          alert('Erreur lors de la récupération des données du personnel');
        }
      })
      .catch(err => console.log(err));
  }, [personnelIm]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/edit_pers/${numCompte}`, { numCompte, nom, solde})
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Modifié',
            text: 'Personnel modifié avec succès',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          allerVers('/afficher');
        } else {
          alert('Une erreur');
        }
      })
      .catch(err => console.log(err));
  }


  return (
    <div>

      <header>
        <div className="container">
          <div id="branding">
            <h1><span className="highlight">Client</span> HM</h1>

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
            <h2>Modifier un client</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="num">Numéro:</label>
                <input
                  type="text"
                  className="form-control"
                  id="num"
                  name="num"
                  value={numCompte}
                


                  aria-describedby="numCompte"
              
                />
              </div>

              <div className="form-group">
                <label htmlFor="nom">Nom:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  required
                  aria-describedby="nom"
                  value={nom} // Afficher l'ancienne valeur
                  onChange={e => setNom(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="solde">Solde:</label>
                <input
                  type="text"
                  className="form-control"
                  id="solde"
                  required
                  aria-describedby="solde"
                  value={solde} // Afficher l'ancienne valeur
                  onChange={e => setSolde(e.target.value)}
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

    </div >



  );
}

export default EditPers;
