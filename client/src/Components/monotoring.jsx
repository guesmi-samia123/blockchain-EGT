import React from "react";
import { Line } from "react-chartjs-2";
import "./MonitoringPage.css";


const MonitoringPage = () => {
  // Sample data for the graph (solar panel production)
  const graphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Production (kWh)",
        data: [300, 400, 500, 600, 550, 450],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="monitoring-page">
      <div className="dashboard">
        <h1>Solar Panel Monitoring</h1>
        {/* Add your dashboard components here */}
        <div className="dashboard-widgets">
          <div className="widget">Current Power: 500 W</div>
          <div className="widget">Total Energy: 2000 kWh</div>
          <div className="widget">Panel Efficiency: 90%</div>
        </div>
      </div>
      <div className="graph-container">
        <h2>Production Trend</h2>
        <Line data={graphData} />
      </div>
    </div>
  );
};

export default MonitoringPage;
