import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './style3.css'
function Choix(props) {


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
   
   
     
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
      <span style={{textAlign:'center'}}>Choisissez pour commencer</span> 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body    className='mod'>
              <ul>

                  <li className='bt'>
                      <Link to="/login" className="bt" onClick={props.onHide} >
                          <i className='bi bi-person-circle me-3 fs-3 ' ></i>
                          <span className="fs-5" >Se connecter en tant qu' admin</span>
                      </Link>
                  </li>
                  <li className='bt'>
                      <Link to="/login2" className="bt"  onClick={props.onHide}>
                          <i className='bi bi-person-circle me-3 fs-3'></i>
                          <span className="fs-5" >Se connecter en tant que client</span>
                      </Link>
                  </li>

              </ul>
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onHide}>Annuler</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Choix;