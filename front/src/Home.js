
import React, { useState } from 'react';
import {  Outlet} from 'react-router-dom';
import Navbare from './Navbar';
import Sidebar0 from './Sidebar0';








function Cordo() {
    const[toggle , setToggle] = useState(false);
    function Toggle(){
      setToggle(!toggle)
    }

  return (
  
    <div className="d-flex" style={{background:'white'}}>
       <div  className={toggle? "d-none" : "w-auto position-fixed" }>
        <Sidebar0 />     
      </div>
      <div  className={toggle? "d-none" : "invisible" }>
        <Sidebar0 />     
      </div>
      <div className='col overflow-auto'>
      <Navbare Toggle={Toggle}/>
        <Outlet/>   
      </div>
    </div>
  

  );
}

export default Cordo;
