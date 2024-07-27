import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom"; // Utilisation de useParams pour récupérer le paramètre de l'URL
import Swal from 'sweetalert2'; // Importez SweetAlert2
import { motion } from "framer-motion"; // Importez motion


function Editcom() {
    const [idcom, setIdcom] = useState('');
  const [idcli, setIdcli] = useState('');
  const [idprod, setIdprod] = useState('');
  const [qt, setQt] = useState('');
  const [daty, setDaty] = useState('');




  const allerVers = useNavigate();
  const { idcom: Id } = useParams(); // Récupérer l'IM depuis l'URL

  useEffect(() => {
    // Récupérer les anciennes valeurs du personnel à partir de la base de données
    axios.get(`http://localhost:8081/edit_com/${Id}`)
      .then(res => {
        if (res.data.Status === "succes") {
          const personnel = res.data.Personnel; // Assurez-vous que votre backend renvoie les anciennes valeurs
          setIdcli(personnel.idcli);
          setIdprod(personnel.idprod);
          setQt(personnel.qt);
          setDaty(personnel.daty);

      
        } else {
          alert('Erreur lors de la récupération des données ');
        }
      })
      .catch(err => console.log(err));
  }, [Id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/edit_com/${Id}`, { idcli: selectedOption1,idprod: selectedOption,qt, daty})
      .then(res => {
        if (res.data.Status === "succes") {
          Swal.fire({
            icon: 'success',
            title: 'Modifié',
            text: 'Commande modifié avec succès',
            showConfirmButton: false, // Masquer le bouton de confirmation
            timer: 1500, // Définir le délai en millisecondes (2000 ms = 2 secondes)
            onBeforeOpen: () => {
              Swal.showLoading(); // Afficher l'icône de chargement pendant le délai
            },
            onClose: () => {
            }
          });
          allerVers('/affichercommande');
        } else {
          alert('Une erreur');
        }
      })
      .catch(err => console.log(err));
  }

  
//////////////////////////////////////////////////////////////////////////DROPDOWN/////////////////////////
const [options, setOptions] = useState([]);
const [selectedOption, setSelectedOption] = useState('');

useEffect(() => {
  axios.get('http://localhost:8081/dropdown_prod')
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


const [options1, setOptions1] = useState([]);
const [selectedOption1, setSelectedOption1] = useState('');

useEffect(() => {
  axios.get('http://localhost:8081/dropdown_cli')
    .then(response => {
      setOptions1(response.data);
    })
    .catch(error => {
      console.error('Error fetching dropdown options: ', error);
    });
}, []);

const handleSelectChange1 = (event) => {
  setSelectedOption1(event.target.value);
};



  return (
    <div>

      <header>
        <div className="container">
          <div id="branding">
            <h1><span className="highlight">COMMANDE</span> </h1>

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
            <h2>Modifier LE produit</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                       
                       <select id="idcli" value={selectedOption1} onChange={(e) => { handleSelectChange1(e); setSelectedOption1(e.target.value); }}>

                               <option value="">Choisi le client ici</option>
                               {options1.map((option1, index) => (
                                   <option key={index} value={option1}>{option1}</option>
                               ))}
                           </select>
                           <p>Selected option: {selectedOption1}</p>
                       </div>


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
                              <label htmlFor="nom">Quantité :</label>
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
                              <label htmlFor="date_semi">Date du commande:</label>
                              <input
                                  type="date"
                                  className="form-control"
                                  id="daty"
                                  required
                                  aria-describedby="daty"
                                  value={daty} // Afficher l'ancienne valeur
                                  onChange={e => setDaty(e.target.value)}
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

export default Editcom;
