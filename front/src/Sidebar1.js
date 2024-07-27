import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './sary/haricot.jpg'
import logo1 from './sary/tsaramaso.jpg'
import logo2 from './sary/vomaina.jpg'
import logo3 from './sary/vomaina2.jpg'


import './style3.css'




function Sidebar1(){
    return(
        <div className='d-flex  flex-column  text-White p-3 vh-2 ' style={{ backgroundColor: 'rgba(0,0,0,0.55)  ', background:'white' }}>
            <div >
                <img style={{marginTop:'1%' , width:'45vh',height:'45vh'}} src={logo} alt="logo" />
            <div className='d-flex '>
            <img style={{marginTop:'1%' , width:'10vh',height:'10vh'}} src={logo} alt="logo" />
            <img style={{marginTop:'1%' , width:'10vh',height:'10vh'}} src={logo2} alt="logo2" />
            <img style={{marginTop:'1%' , width:'10vh',height:'410h'}} src={logo1} alt="logo1" />
            <img style={{marginTop:'1%' , width:'10vh',height:'410h'}} src={logo3} alt="logo3" />
            </div>    
            </div>

            <h4 style={{marginTop:'5%'}}>Le haricot , l'un de nos plus <span style={{color:'#217e38'}}>grandes</span> production </h4><br></br>

             
            <hr className='text-secondary mt-2' />
         <h5>N'hésitez pas à fair vos achats avec un seul click😛</h5>


           
         </div>


    );

}

export default Sidebar1;