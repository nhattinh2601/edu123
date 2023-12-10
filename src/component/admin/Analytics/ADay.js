import React, { useEffect, useRef } from 'react';
import Header from "../Header/Header";

const Aday = () => {
  const pieChartRef = useRef(null);

  useEffect(() => {
    const loadGoogleCharts = () => {
      // Check if google charts library is already loaded
      if (window.google && window.google.charts) {
        drawChart();
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(drawChart);
        };
        document.body.appendChild(script);
      }
    };

    const drawChart = () => {
      // Ensure the google object is available in the window scope
      const google = window.google;
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Element');
      data.addColumn('number', 'Percentage');
      data.addRows([
        ['Nitrogen', 0.78],
        ['Oxygen', 0.21],
        ['Other', 0.01]
      ]);

      // Ensure the DOM element is available
      if (pieChartRef.current) {
        const chart = new google.visualization.ColumnChart(pieChartRef.current);
        chart.draw(data, null);
      }
    };

    loadGoogleCharts();

    // Cleanup function to remove the script tag
    return () => {
      const script = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return(
  <div> 
    <Header/>
    <div ref={pieChartRef} style={{ width: '100%', height: '500px' }} />
  </div>);
};

export default Aday;