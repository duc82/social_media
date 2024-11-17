import { PersonPlusFill, Search } from "react-bootstrap-icons";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

export default function UsersOverview() {
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
                    <i className="bi-graph-up"></i> 5.0%
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
                    <i className="bi-graph-up"></i> 1.2%
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
                    <i className="bi-graph-down"></i> 2.8%
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
        </div>

        <div className="d-sm-flex justify-content-md-end align-items-sm-center gap-2">
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-white btn-sm dropdown-toggle w-100 show"
              id="usersExportDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <i className="bi-download me-2"></i> Export
            </button>

            <div
              className="dropdown-menu dropdown-menu-sm-end show"
              aria-labelledby="usersExportDropdown"
              data-popper-placement="top-start"
            >
              <span className="dropdown-header">Options</span>
              <a id="export-copy" className="dropdown-item" href="javascript:;">
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/illustrations/copy-icon.svg"
                  alt="Image Description"
                />
                Copy
              </a>
              <a
                id="export-print"
                className="dropdown-item"
                href="javascript:;"
              >
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/illustrations/print-icon.svg"
                  alt="Image Description"
                />
                Print
              </a>
              <div className="dropdown-divider"></div>
              <span className="dropdown-header">Download options</span>
              <a
                id="export-excel"
                className="dropdown-item"
                href="javascript:;"
              >
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/brands/excel-icon.svg"
                  alt="Image Description"
                />
                Excel
              </a>
              <a id="export-csv" className="dropdown-item" href="javascript:;">
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/components/placeholder-csv-format.svg"
                  alt="Image Description"
                />
                .CSV
              </a>
              <a id="export-pdf" className="dropdown-item" href="javascript:;">
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/brands/pdf-icon.svg"
                  alt="Image Description"
                />
                PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
