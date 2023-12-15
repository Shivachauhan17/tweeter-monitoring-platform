import React,{memo,useRef,useEffect} from 'react';
import Chart from 'chart.js/auto';


const CurrentPerson:React.FC=()=>{

    const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if(ctx && Chart){

    const data = {
      labels: ['Category 1', 'Category 2', 'Category 3'],
      datasets: [{
        data: [30, 40, 30], // Replace with your data values
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'], // Replace with your colors
      }]
    };

    new Chart(ctx, {
      type: 'pie',
      data: data,
    });
    }
  }, []);


    return(
        <div className='pcContainer'>
            <div className='vNvStats'>
                <canvas id='myPieChart'></canvas>
            </div>
        </div>
    )
}

export default memo(CurrentPerson);