import React, { useState} from 'react';
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({})

  return (
    <div>
    <Line data options />
      
  {/* https://disease.sh/v3/covid-19/historical/all?lastdays=120 */}

    </div>
  )
}

export default LineGraph