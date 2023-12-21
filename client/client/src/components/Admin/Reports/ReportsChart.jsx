// ReportsChart component

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

const ReportsChart = ({ data, view, onClose }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!onClose) {
      return; // Only proceed if there's a function to close the modal
    }

    const chartCanvas = chartRef.current;
    const chartContext = chartCanvas.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = data.map((row) => row.date);
    const datasets = Object.keys(data[0])
      .slice(1)
      .map((key) => ({
        label: key,
        data: data.map((row) => row[key]),
        backgroundColor: `rgba(${Math.floor(Math.random() * 156)}, ${Math.floor(
          Math.random() * 156
        )}, ${Math.floor(Math.random() * 156)}, 0.4)`,
        borderColor: `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(
          Math.random() * 200
        )}, ${Math.floor(Math.random() * 200)}, 1)`,
        borderWidth: 2,
      }));

    const chartConfig = {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Report Chart - ${
              view.charAt(0).toUpperCase() + view.slice(1)
            }`,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    chartInstance.current = new Chart(chartContext, chartConfig);

    // Attach a listener to the window to close the modal on outside click
    const clickListener = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        onClose(); // Close the modal when clicking outside the chart
      }
    };

    window.addEventListener("click", clickListener);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [data, view, onClose]);

  return <canvas ref={chartRef} width={400} height={300} />;
};

ReportsChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired, // Add prop type for onClose
};

export default ReportsChart;
