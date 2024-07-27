import React from 'react';
import { motion } from "framer-motion"; // Importez motion
import { Link } from 'react-router-dom';
import './css/style.css';


function AccueilAdmin() {
  return (
    <div>

      <header>
        <div class="container">
          <div id="branding">
          <h1><span class="highlight">SRB</span> HM</h1>
          </div>
          <nav>
            <ul>
              <li class="current"><Link to={`/log_index`} className=' '>ACCUEIL</Link></li>
              <li><Link to={`/log_services`} className=''>SERVICES</Link></li>
              <li><Link to={`/log_about`} className=''>A PROPOS</Link></li>
              <li className=" current"><Link to={`/accueil_cordo`} className=''>Cordo</Link></li>

            </ul>
          </nav>
        </div>
      </header>




      <div className='nav-before'></div>
     




      

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=' justify-content-center align-items-center '
      >

        <section id="showcase">
          <div className="corps containerrrr">
          <h1>Service Régional des Budgets - Haute Matsiatra</h1>
            
            <p>
              Pour plus d'information. veuillez contacter ce numéro :
              034 25 929 63 , ou par email :
              niirakoto@gmail.com
            </p>
          </div>
        </section>

        <section id="newsletter">
          <div class="container">
            <h1>Bienvenue dans notre page</h1>
            
          </div>
        </section>

        <section id="boxes">
          <div class="container">

            <div class="box">
              <h3>CIR</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies</p>
            </div>

            <div class="box">

              <h3>DBRFM</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies</p>
            </div>
            <div class="box">

              <h3>EPN</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies</p>
            </div>
            <div class="box">

              <h3>DPE</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies</p>
            </div>
          </div>
        </section>

        <footer>
          <p>Etudiant de l'ENI Web Deisgn, Copyright &copy; 2023</p>
        </footer>



      </motion.div>
    </div>
  );
}

export default AccueilAdmin;
