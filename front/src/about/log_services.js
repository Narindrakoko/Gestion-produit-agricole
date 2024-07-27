import React from 'react';
import { motion } from "framer-motion"; // Importez motion
import { Link } from 'react-router-dom';
import './css/style.css';


function Services() {
  return (
    <div>
      <header>
        <div class="container">
          <div id="branding">
          <h1><span class="highlight">SRB</span> HM</h1>
          </div>
          <nav>
            <ul>
              <li><Link to={`/log_index`} className=' '>ACCUEIL</Link></li>
              <li class="current"><Link to={`/log_services`} className=''>SERVICES</Link></li>
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
        className=' justify-content-center align-items-center'
      >
        <section id="newsletter">
          <div class="container">
            <h1>Service Régional des Budgets - Haute Matsiatra</h1>
            
          </div>
        </section>

        <section id="main">
          <div class="container">
            <article id="main-col">
              <h1 class="page-title">Services</h1>
              <ul id="services">
                <li>
                  <h3>Ny zavatra atao ao amin'ny Finances</h3>
                  <p>Afaka manao demande de remboursement des frais medicaux. 
                    De mbola afaka manao zavatra maro be...
                  </p>
                  <p>Mandehana aloha ao amin'ny Sécrétariat</p>
                </li>
                <li>
                  <h3>Website Design</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.</p>
                  <p>Pricing: $1,000 - $3,000</p>
                </li>
                <li>
                  <h3>Website Maintenance</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.</p>
                  <p>Pricing: $250 per month</p>
                </li>
                <li>
                  <h3>Website Hosting</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.</p>
                  <p>Pricing: $25 per month</p>
                </li>
              </ul>
            </article>

            <aside id="sidebar">
              <div class="dark">
                <h3>Contactez-nous</h3>
                <form class="quote">
                  <div>
                    <label>Nom</label>
                    <br />
                    <input type="text" placeholder="Name" />
                  </div>
                  <div>
                    <label>Email</label>
                    <br />
                    <input type="email" placeholder="Email Address" />
                  </div>
                  <div>
                    <label>Message</label>
                    <br />
                    <textarea placeholder="Message"></textarea>
                  </div>
                  <button class="button_1" type="submit">Envoyer</button>
                </form>
              </div>
            </aside>
          </div>
        </section>

        <footer>
          <p>Nii Rakoto Web Deisgn, Copyright &copy; 2023</p>
        </footer>


      </motion.div>
    </div>
  );
}


export default Services;
