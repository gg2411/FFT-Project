// FrequencyDomainChart.js
/**
 * FrequencyDomainChart Component
 * Displays the frequency-domain signal using Chart.js
 */
import React from 'react';
import { Bar } from 'react-chartjs-2';

function FrequencyDomainChart({ data }) {
  const chartData = {
    labels: data.map((_, index) => index),
    datasets: [
      {
        label: 'Magnitude',
        data: data,
        backgroundColor: 'rgba(40, 167, 69, 1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Bar data={chartData} options={options} />
  );
}

export default FrequencyDomainChart;
