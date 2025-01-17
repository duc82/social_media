import {
  Download,
  Filter,
  GraphDown,
  PersonPlusFill,
  Search,
} from "react-bootstrap-icons";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import excel from "@/assets/excel-icon.svg";
import pdf from "@/assets/pdf-icon.svg";
import csv from "@/assets/placeholder-csv-format.svg";
import { GraphUp } from "react-bootstrap-icons";
import { useState } from "react";
import Table from "@/components/Table";

export default function UsersOverview() {
  const [keys, setKeys] = useState<string[]>([
    "Id",
    "Name",
    "Email",
    "Role",
    "Status",
    "Created at",
  ]);
  const [datas, setDatas] = useState<any[][]>([]);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm mb-2 mb-sm-0">
            <h1 className="page-header-title">Users</h1>
          </div>
          <div className="col-sm-auto">
            <Link
              to="add"
              className="btn btn-primary d-inline-flex align-items-center gap-1"
            >
              <PersonPlusFill /> <span>Add user</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2">Total users</h6>

              <div className="row align-items-center gx-2">
                <div className="col">
                  <CountUp start={0} end={24} delay={0}>
                    {({ countUpRef }) => (
                      <span
                        className="display-4 text-dark"
                        ref={countUpRef}
                      ></span>
                    )}
                  </CountUp>
                  <span className="text-body fs-5 ms-1">from 22</span>
                </div>

                <div className="col-auto">
                  <span className="badge bg-soft-success text-success p-1">
                    <GraphUp /> 5.0%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2">Active members</h6>

              <div className="row align-items-center gx-2">
                <div className="col">
                  <CountUp start={0} end={12} delay={0}>
                    {({ countUpRef }) => (
                      <span
                        className="display-4 text-dark"
                        ref={countUpRef}
                      ></span>
                    )}
                  </CountUp>
                  <span className="text-body fs-5 ms-1">from 11</span>
                </div>

                <div className="col-auto">
                  <span className="badge bg-soft-success text-success p-1">
                    <GraphUp /> 1.2%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2">New/returning</h6>

              <div className="row align-items-center gx-2">
                <div className="col">
                  <CountUp start={0} end={56} delay={0}>
                    {({ countUpRef }) => (
                      <span
                        className="display-4 text-dark"
                        ref={countUpRef}
                      ></span>
                    )}
                  </CountUp>

                  <span className="display-4 text-dark">%</span>
                  <span className="text-body fs-5 ms-1">from 48.7</span>
                </div>

                <div className="col-auto">
                  <span className="badge bg-soft-danger text-danger p-1">
                    <GraphDown /> 2.8%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2">Active members</h6>

              <div className="row align-items-center gx-2">
                <div className="col">
                  <CountUp start={0} end={28} delay={0}>
                    {({ countUpRef }) => (
                      <span
                        className="display-4 text-dark"
                        ref={countUpRef}
                      ></span>
                    )}
                  </CountUp>

                  <span className="display-4 text-dark">%</span>
                  <span className="text-body fs-5 ms-1">from 28.6%</span>
                </div>

                <div className="col-auto">
                  <span className="badge bg-soft-secondary text-secondary p-1">
                    0.0%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header card-header-content-md-between">
          <div className="mb-2 mb-md-0">
            <form action="">
              <div className="input-group input-group-merge input-group-flush">
                <div className="input-group-prepend input-group-text">
                  <Search />
                </div>
                <input
                  id="datatableSearch"
                  type="search"
                  className="form-control"
                  placeholder="Search users"
                  aria-label="Search users"
                />
              </div>
            </form>
          </div>
          <div className="d-sm-flex justify-content-md-end align-items-sm-center gap-2">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-white btn-sm dropdown-toggle w-100"
                id="usersExportDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <Download size={14} className="me-2" /> Export{" "}
              </button>

              <div
                className="dropdown-menu dropdown-menu-sm-end"
                aria-labelledby="usersExportDropdown"
                data-popper-placement="top-start"
              >
                <button
                  type="button"
                  id="export-excel"
                  className="dropdown-item"
                >
                  <img
                    className="avatar avatar-xss avatar-4x3 me-2"
                    src={excel}
                    alt="Image Description"
                  />
                  Excel
                </button>
                <button type="button" id="export-csv" className="dropdown-item">
                  <img
                    className="avatar avatar-xss avatar-4x3 me-2"
                    src={csv}
                    alt="Image Description"
                  />
                  .CSV
                </button>
                <button type="button" id="export-pdf" className="dropdown-item">
                  <img
                    className="avatar avatar-xss avatar-4x3 me-2"
                    src={pdf}
                    alt="Image Description"
                  />
                  PDF
                </button>
              </div>
            </div>

            <div className="dropdown">
              <button
                type="button"
                className="btn btn-white btn-sm w-100"
                id="usersFilterDropdown"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <Filter size={14} className="me-1" />
                Filter{" "}
                <span className="badge bg-soft-dark text-dark rounded-circle ms-1">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <Table
            keys={keys}
            datas={datas}
            tableClassName="table table-lg"
            theadClassName="thead-light"
            hasCheckbox
            upperCaseHeader
          />
        </div>
      </div>
    </div>
  );
}
