import "./dashboard.scss";
import "chart.js/auto";
import type { ChartData, ChartOptions } from "chart.js/auto";
import { useCallback } from "react";
import { GraphUp, GraphDown } from "react-bootstrap-icons";
import { Chart } from "react-chartjs-2";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const getData = useCallback(
    (data?: number[]): ChartData<"line", number[], string> => {
      const date = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      );

      const month = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(date);

      const dates = date.getDate();

      return {
        labels: Array.from({ length: dates }, (_, i) => `${i + 1} ${month}`),
        datasets: [
          {
            data:
              data ||
              Array.from({ length: dates }, () =>
                Math.floor(Math.random() * 100)
              ),
            backgroundColor: "rgb(55,125,255)",
            borderColor: "#377DFF",
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      };
    },
    []
  );

  const getOptions = useCallback(
    (label: "Users" | "Posts" | "Groups" | "Media"): ChartOptions<"line"> => {
      return {
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
            padding: 10,
            callbacks: {
              label(this, tooltipItem) {
                const value = new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(tooltipItem.raw as number);

                return ` ${label}: ${value}`;
              },
            },
          },
        },
      };
    },
    []
  );

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <h1 className="page-header-title">Dashboard</h1>
      </div>

      <div className="row">
        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <Link className="card card-hover-shadow h-100" to="#">
            <div className="card-body">
              <h6 className="card-subtitle">Users</h6>

              <div className="row align-items-center gx-2">
                <div className="col-6">
                  <h2>72,540</h2>
                </div>
                <div className="col-6">
                  <div className="position-relative mx-auto">
                    <Chart
                      type="line"
                      data={getData()}
                      options={getOptions("Users")}
                    />
                  </div>
                </div>
              </div>

              <span className="badge bg-soft-success text-success">
                <GraphUp width={12} height={12} /> 12.5%
              </span>
              <span className="text-body fs-6 ms-1"> from 70,104</span>
            </div>
          </Link>
        </div>
        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <Link className="card card-hover-shadow h-100" to="#">
            <div className="card-body">
              <h6 className="card-subtitle">Posts</h6>

              <div className="row align-items-center gx-2">
                <div className="col-6">
                  <h2>72,540</h2>
                </div>
                <div className="col-6">
                  <div className="position-relative mx-auto">
                    <Chart
                      type="line"
                      data={getData()}
                      options={getOptions("Posts")}
                    />
                  </div>
                </div>
              </div>

              <span className="badge bg-soft-success text-success">
                <GraphUp width={12} height={12} /> 12.5%
              </span>
              <span className="text-body fs-6 ms-1"> from 70,104</span>
            </div>
          </Link>
        </div>
        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <Link className="card card-hover-shadow h-100" to="#">
            <div className="card-body">
              <h6 className="card-subtitle">Groups</h6>

              <div className="row align-items-center gx-2">
                <div className="col-6">
                  <h2>72,540</h2>
                </div>
                <div className="col-6">
                  <div className="position-relative mx-auto">
                    <Chart
                      type="line"
                      data={getData()}
                      options={getOptions("Groups")}
                    />
                  </div>
                </div>
              </div>

              <span className="badge bg-soft-danger text-danger">
                <GraphDown width={12} height={12} /> 12.5%
              </span>
              <span className="text-body fs-6 ms-1"> from 70,104</span>
            </div>
          </Link>
        </div>
        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <Link className="card card-hover-shadow h-100" to="#">
            <div className="card-body">
              <h6 className="card-subtitle">Medias</h6>

              <div className="row align-items-center gx-2">
                <div className="col-6">
                  <h2>72,540</h2>
                </div>
                <div className="col-6">
                  <div className="position-relative mx-auto">
                    <Chart
                      type="line"
                      data={getData()}
                      options={getOptions("Media")}
                    />
                  </div>
                </div>
              </div>

              <span className="badge bg-soft-success text-success">
                <GraphUp width={12} height={12} /> 12.5%
              </span>
              <span className="text-body fs-6 ms-1"> from 70,104</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
