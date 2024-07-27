
import React, { useState } from 'react';
import {  Outlet} from 'react-router-dom';
import Navbare from './Navbar';
import Sidebar0 from './Sidebar0';
import Navtrano from './Navtrano';







function Tout() {
    const[toggle , setToggle] = useState(false);
    function Toggle(){
      setToggle(!toggle)
    }

  return (
  
    <div className="d-flex trano" >
    <div className='col overflow-auto' style={{ position: 'relative' }}>
      <Navtrano />
      <Outlet />   
    </div>
  </div>
  
  

  );
}

export default Tout;
