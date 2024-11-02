import "./dashboard.scss";
import "chart.js/auto";
import type { ChartData, ChartOptions } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function Dashboard() {
  const users: ChartData<"line", number[], string> = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [
          1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000,
          12000,
        ],
        backgroundColor: "rgb(55,125,255)",
        borderColor: "#377DFF",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
      },
    },
  };

  return (
    <div className="content container-fluid">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="row">
        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <a className="card card-hover-shadow h-100" href="#">
            <div className="card-body">
              <h6 className="card-subtitle">Total Users</h6>

              <div className="row align-items-center gx-2 mb-1">
                <div className="col-6">
                  <h2 className="card-title text-inherit">72,540</h2>
                </div>

                <div className="col-6">
                  <div className="position-relative overflow-hidden mx-auto">
                    <Chart type="line" data={users} options={options} />
                  </div>
                </div>
              </div>

              <span className="badge bg-soft-success text-success">
                <i className="bi-graph-up"></i> 12.5%
              </span>
              <span className="text-body fs-6 ms-1">from 70,104</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
