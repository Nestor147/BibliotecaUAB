//import { Chart } from 'chart.js';
import React from 'react'
//import { getRelativePosition } from 'chart.js/helpers';
import { Pie } from 'react-chartjs-2';

export default function TortaCarreras() {

    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(0,0,255)",
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };

    return (
    <div>
        <Pie data={data} />
    </div>
  )
}
