import { PersonPlusFill } from "react-bootstrap-icons";
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
              className="btn btn-primary d-flex align-items-center gap-1"
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
                  <span
                    className="js-counter display-4 text-dark"
                    data-value="24"
                  >
                    24
                  </span>
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
                  <span
                    className="js-counter display-4 text-dark"
                    data-value="12"
                  >
                    12
                  </span>
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
                  <span
                    className="js-counter display-4 text-dark"
                    data-value="56"
                  >
                    56
                  </span>
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
                  <span
                    className="js-counter display-4 text-dark"
                    data-value="28"
                  >
                    28
                  </span>
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
    </div>
  );
}
