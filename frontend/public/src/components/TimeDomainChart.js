// TimeDomainChart.js
/**
 * TimeDomainChart Component
 * Displays the time-domain signal using Chart.js
 */
import React from 'react';
import { Line } from 'react-chartjs-2';

function TimeDomainChart({ data }) {
  const chartData = {
    labels: data.map((_, index) => index),
    datasets: [
      {
        label: 'Amplitude',
        data: data,
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
  };

  return (
    <Line data={chartData} options={options} />
  );
}

export default TimeDomainChart;
