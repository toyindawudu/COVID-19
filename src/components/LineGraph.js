import React, { useState} from 'react';
import { Line } from "react-chartjs-2";

function LineGraph() {
  j
  const [data, setData] = useState({})

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then(response => response.json())
    .then(data => {
      // clever stuff here
    });
  }, [])

  return (
    <div>
    <Line 
    data 
    options 
    />
      
  {/* https://disease.sh/v3/covid-19/historical/all?lastdays=120 */}

    </div>
  )
}

export default LineGraph