import React, { useEffect,useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// Assuming this is a custom CSS file for additional styling.
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion


function Newculture() {

  const [idprod, setIdprod] = useState('');
  const [date_semi, setDateSemi] = useState('');
  const [date_recolte, setDateRecolte] = useState('');
  const[nom,setNom] = useState('');


  const allerVers = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/ajoutercult', { idprod: selectedOption,nom, date_semi, date_recolte })
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Ajouté',
            text: 'type de culture ajouté avec succès.',
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
  
          allerVers('/afficherculture');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Le commande existe déjà.',
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
  


//////////////////////////////////////////////////////////////////////////DROPDOWN/////////////////////////
const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/dropdown')
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching dropdown options: ', error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <div>

      <header>
        <div class="container">
          <div id="branding">
            <h1><span class="highlight">Culture</span></h1>

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
                      <h2>Ajouter un nouveau</h2>
                      <form onSubmit={handleSubmit}>
                          <div className="form-group">
                       
                          <select id="idprod" value={selectedOption} onChange={(e) => { handleSelectChange(e); setSelectedOption(e.target.value); }}>

                                  <option value="">Choisi le produit ici</option>
                                  {options.map((option, index) => (
                                      <option key={index} value={option}>{option}</option>
                                  ))}
                              </select>
                              <p>Selected option: {selectedOption}</p>
                          </div>

                          <div className="form-group">
                              <label htmlFor="nom">Description du culture:</label>
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
                              <label htmlFor="date_semi">Date semi:</label>
                              <input
                                  type="date"
                                  className="form-control"
                                  id="date-semi"
                                  required
                                  aria-describedby="date_semi"
                                  value={date_semi} // Afficher l'ancienne valeur
                                  onChange={e => setDateSemi(e.target.value)}
                              />
                          </div>

                          <div className="form-group">
                              <label htmlFor="descri">Date recolte:</label>
                              <input
                                  type="date"
                                  className="form-control"
                                  id="date_recolte"
                                  required
                                  aria-describedby="date_recolte"
                                  value={date_recolte} // Afficher l'ancienne valeur
                                  onChange={e => setDateRecolte(e.target.value)}
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

export default Newculture;
