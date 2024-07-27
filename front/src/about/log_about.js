import React from 'react';
import { motion } from "framer-motion"; // Importez motion
import { Link } from 'react-router-dom';
import './css/style.css';


function About() {
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
              <li><Link to={`/log_services`} className=''>SERVICES</Link></li>
              <li class="current"><Link to={`/log_about`} className=''>A PROPOS</Link></li>
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
              <h1 class="page-title">A propos</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius auctor lacus nec feugiat. Phasellus sit amet ex ipsum. Praesent pharetra tincidunt tempor. Etiam velit eros, dapibus eget porta in, lacinia et magna. Nam eget eros non orci consectetur congue at ac augue. Proin eget arcu in enim feugiat ultricies. Curabitur maximus metus nec metus pretium viverra at et orci. Integer hendrerit ante ut placerat cursus.
              </p>
              <p class="dark">
                Aliquam eget pharetra diam. Nulla placerat lorem at turpis tempor, vel ultrices dui tincidunt. Proin quis egestas lorem. Mauris vehicula lectus odio, sit amet dictum justo feugiat a. Praesent id dictum lacus. Sed ullamcorper id erat ut dictum. Fusce porttitor lorem sapien, in aliquet sapien convallis et. Donec nec mauris nulla. Curabitur cursus semper odio, et hendrerit ante. Nunc at cursus ante. Maecenas gravida ligula ut efficitur suscipit. Nulla id turpis varius, pretium nunc sed, fermentum sem. Sed lacinia nunc non interdum pellentesque.
              </p>
            </article>

            <aside id="sidebar">
              <div class="dark">
                <h3>Notre But</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius auctor lacus nec feugiat. Phasellus sit amet ex ipsum. Praesent pharetra tincidunt tempor. Etiam velit eros, dapibus eget porta in, lacinia et magna</p>
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

export default About;
