import './App.css';
import './style3.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion"; // Importez motion
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importez SweetAlert2


function Afficher() {

  useEffect(() => {

    axios.post('http://localhost:8081/list_pers')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erreur au niveau de : ' + error);
      });
  }, []);

  const [data, setData] = useState([]);

  const handleDelete = async (im) => {
    try {
      await axios.delete('http://localhost:8081/list_pers/' + im)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }



  //const division = "CIR"; 


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
        <Link to={'/ajout'} className="btn btn-success ms-2">
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
                <th>Numero</th>
                <th>Nom Prenom</th>
                <th>Solde</th>
                <th>Obs</th>
         

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.numCompte}>
                  <td>{item.numCompte}</td>
                  <td>{item.nom}</td>
                  <td>{item.solde}</td>
                  <td>{item.obs}</td>
                 

                  <td >

                    <Link to={`../edit_pers/${item.numCompte}`} className='btn  ms-2'><i className='bi bi-pencil-square text-success fs-2' ></i></Link>
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
                            await handleDelete(item.numCompte);
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

export default Afficher;