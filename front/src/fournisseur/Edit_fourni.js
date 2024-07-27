import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom"; // Utilisation de useParams pour récupérer le paramètre de l'URL
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion


function EditFourni() {
  const [idfourni, setId] = useState('');
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [contact, setContact] = useState('');




  const allerVers = useNavigate();
  const { idfourni: Id } = useParams(); // Récupérer l'IM depuis l'URL

  useEffect(() => {
    // Récupérer les anciennes valeurs du personnel à partir de la base de données
    axios.get(`http://localhost:8081/edit_fourni/${Id}`)
      .then(res => {
        if (res.data.Status === "succes") {
          const personnel = res.data.Personnel; // Assurez-vous que votre backend renvoie les anciennes valeurs
          setId(personnel.idfourni);
          setNom(personnel.nom);
          setAdresse(personnel.adresse);
          setContact(personnel.contact);
     
      
        } else {
          alert('Erreur lors de la récupération des données ');
        }
      })
      .catch(err => console.log(err));
  }, [Id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/edit_fourni/${idfourni}`, { idfourni, nom, adresse, contact})
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Modifié',
            text: 'Fournisseur modifié avec succès',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          allerVers('/afficherfourni');
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
            <h1><span className="highlight">FOURNISSEUR</span> </h1>

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
            <h2>Modifier le fournisseur
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Idfourni">Identifiant:</label>
                <input
                  type="text"
                  className="form-control"
                  id="idfourni"
                  name="idfourni"
                  value={idfourni}
                


                  aria-describedby="idfourni"
              
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
                <label htmlFor="adresse">Adresse:</label>
                <input
                  type="text"
                  className="form-control"
                  id="adresse"
                  required
                  aria-describedby="adresse"
                  value={adresse} // Afficher l'ancienne valeur
                  onChange={e => setAdresse(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact :</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  required
                  aria-describedby="contact"
                  value={contact} // Afficher l'ancienne valeur
                  onChange={e => setContact(e.target.value)}
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

export default EditFourni;
