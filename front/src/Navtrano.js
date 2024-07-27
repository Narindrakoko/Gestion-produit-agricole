import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Trano.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import tropical from './sary/logo1.png'
import { Link } from 'react-router-dom';
import Choix from './Choix';
import Button from 'react-bootstrap/Button';


function Navtrano  ({Toggle})  {

    const [modalShow, setModalShow] = React.useState(false);
  return (
   
    <div  >
     
    



<Navbar bg="transparent" expand="lg" >
      <Container  >
        <Navbar.Brand >
        <img src={tropical} alt="tropical"  style={{width:'20vh' , height:'15vh'}}/>


        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link  > <Link to="/principal" className='bt2'>
                Accueil
              </Link></Nav.Link>
              <Nav.Link > <Link to="/about1" className='bt2'>
                A propos
              </Link></Nav.Link>
              <Nav.Link  className='bt2'  onClick={() => setModalShow(true)}>   
              Se connecter
              </Nav.Link>

            </Nav>
        </Navbar.Collapse>
      </Container>
          </Navbar>



          <Choix
        show={modalShow}
        onHide={() => setModalShow(false)}
      />


    </div>
  
  );
};

export default Navtrano;