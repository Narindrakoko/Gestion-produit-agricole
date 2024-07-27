
import React from 'react';
import Grafy from './Grafy';
import Grafy2 from './Grafy2';
import { useEffect, useState} from 'react';




function Home() {

    const [rowCountdbrfm, setRowCountdbrfm] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8081/total');
          const data = await response.json();
          setRowCountdbrfm(data.rowCount);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);


    const [rowCountcir, setRowCountcir] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8081/max');
          const data = await response.json();
          setRowCountcir(data.rowCount);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);


    const [rowCountepn, setRowCountepn] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8081/min');
          const data = await response.json();
          setRowCountepn(data.rowCount);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

   
    

    
  return (
    <div className="container-fluid ">
        <div className='row'>
            <div className='col-12 col-sm-6 col-md-2 col-lg-3 p-3 bg-light'>
                <div className='d-flex justify-content-between py-4 px-2 align-items-center bg-white border border-rounded'> 
                 <i className='bi bi-clipboard2-pulse fs-1 text-success'> </i>
                 <div>
                    <span>TOTAL</span>
                    <h2>{rowCountdbrfm}</h2>
                 </div>
                </div>

            </div>
            <div className='col-12 col-sm-6 col-md-2 col-lg-3 p-3 bg-light'>
                <div className='d-flex justify-content-between py-4 px-2 align-items-center bg-white border border-rounded'> 
                 <i className='bi bi-graph-up-arrow fs-1 text-primary' > </i>
                 <div>
                    <span>MAX</span>
                    <h2>={rowCountcir}</h2>
                 </div>
                </div>

            </div>
            <div className='col-12 col-sm-6 col-md-2 col-lg-3 p-3 bg-light'>
                <div className='d-flex justify-content-between py-4 px-2 align-items-center bg-white border border-rounded'> 
                 <i className='bi bi-graph-down-arrow fs-1 text-danger' > </i>
                 <div>
                    <span>MIN</span>
                    <h2>{rowCountepn}</h2>
                 </div>
                </div>

            </div>
           
        </div>

        <div className='row'>
            <div className='col-12 col-md-8 p-3'>
                    <Grafy2/>
            </div>
            <div className='col-12 col-md-4 p-3'>
                    <Grafy/>
            </div>
        </div>
    
    </div>
    
  );
}

export default Home;
