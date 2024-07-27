
import '../style3.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion"; // Importez motion
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importez SweetAlert2


function Afficher_culture() {

  useEffect(() => {

    axios.post('http://localhost:8081/list_cult')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erreur au niveau de : ' + error);
      });
  }, []);

  const [data, setData] = useState([]);

  const handleDelete = async (idcult) => {
    try {
      await axios.delete('http://localhost:8081/list_cult/' + idcult)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }


  function formatDateTime(dateTimeString) {
    // Créez un objet Date à partir de la chaîne de date/heure (format "YYYY-MM-DDTHH:mm:ss")
    const dateTime = new Date(dateTimeString);
  
    // Obtenez le jour, le mois et l'année à partir de l'objet Date
    const day = dateTime.getDate();
    const month = dateTime.getMonth(); // Les mois sont indexés à partir de 0
    const year = dateTime.getFullYear() ;
  
    // Obtenez l'heure et les minutes

  
    // Noms des mois en français
    const moisActuel = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ][month];
  
    // Formatez la date et l'heure au format "DD mois AAAA HH:MM"
    const formattedDateTime = `${day.toString().padStart(2, '0')} ${moisActuel} ${year} `;
  
    return formattedDateTime;
  }



  return (
    <div>
      <header>
        <div class="container">
    
          <nav>
            <ul>



            </ul>
          </nav>
        </div>
      </header>






          



        <div className="navleft p-3">
        <Link to={'/ajout_cult'} className="btn btn-success ms-2">
                <i className='bi bi-person-add me-3 fs-4'></i>
                <span className="fs-5" >Ajouter</span>
       </Link>
       
        </div>
        <div className="navright">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=' justify-content-center align-items-center'
      >
        <div className='w-30 rounded'>

        <div className='w-30 rounded '  style={{backgroundColor: 'rgba(0,0,0,0.55)  ', boxShadow: '5px 6px 30px rgba(0, 0, 0, 9)' , marginLeft:'2%' ,  marginRight:'2%' }}>
          


          <table className=" table table-success table-striped">
            <thead  className='border'>
              <tr>
                <th>Culture</th>
                <th>Produit</th>
                <th>Date_Semi</th>
                <th>Date_Recolte</th>
             
         

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.idcult}>
                  <td>{item.nom}</td>
                  <td>{item.prod}</td>
                  <td>{formatDateTime(item.date_semi)}</td>
                  <td>{formatDateTime(item.date_recolte)}</td>
     

                  <td >

                    <Link to={`../edit_cult/${item.idcult}`} className='btn  ms-2'><i className='bi bi-pencil-square text-success fs-2' ></i></Link>
                    <button
                      className='btn ms-4'
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: 'Êtes-vous sûr de vouloir supprimer le Personnel ?',
                          text: "Cette action est irréversible !",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Oui, supprimer',
                          cancelButtonText: 'Annuler',
                        });

                        if (result.isConfirmed) {
                          try {
                            await handleDelete(item.idcult);
                            // Vous pouvez également ajouter une SweetAlert2 pour indiquer que la suppression a réussi
                            Swal.fire('Supprimé !', 'Le personnel a été supprimé avec succès.', 'success');
                          } catch (err) {
                            // En cas d'erreur, affichez une autre alerte SweetAlert2
                            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du personnel.', 'error');
                          }
                        }
                      }}
                    >
                      <i className='bi bi-trash3 text-danger fs-2' ></i>
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        
                                </div>
        </div>
      </motion.div></div>
 




</div >
  );
}

export default Afficher_culture;