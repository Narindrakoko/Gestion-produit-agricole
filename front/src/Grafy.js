
import React from 'react';
import chart from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import { useEffect, useState} from 'react';





function Grafy() {






  const [rowCounttotal, setRowCounttotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/total');
        const data = await response.json();
        setRowCounttotal(data.rowCount);
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

 


  
  const data = {
    labels: ['TOTAL', 'MAX', 'MIN'],
    datasets: [
        {
            label: 'Sales',
            backgroundColor: [
                'rgba(75,192,192,0.4)', // Color for 'CIR'
                'rgba(255,99,132,0.4)', // Color for 'DBRFM'
                'rgba(255,205,86,0.4)', // Color for 'EPN'
      
            ],
            borderColor: [
                'rgba(75,192,192,1)', // Border color for 'CIR'
                'rgba(255,99,132,1)', // Border color for 'DBRFM'
                'rgba(255,205,86,1)', // Border color for 'EPN'
            
            ],
            borderWidth: 2,
            hoverBackgroundColor: [
                'rgba(75,192,192,0.6)', // Hover color for 'CIR'
                'rgba(255,99,132,0.6)', // Hover color for 'DBRFM'
                'rgba(255,205,86,0.6)', // Hover color for 'EPN'
  
            ],
            hoverBorderColor: [
                'rgba(75,192,192,1)', // Hover border color for 'CIR'
                'rgba(255,99,132,1)', // Hover border color for 'DBRFM'
                'rgba(255,205,86,1)', // Hover border color for 'EPN'
   
            ],
            data: [rowCounttotal,rowCountcir, rowCountepn],
        },
    ],
};


  

  return (
    <div className='bg-white border border-rounded'>
      <h4>Activité</h4>
      <Pie data={data}  />
    </div>
    
  );
}

export default Grafy;
