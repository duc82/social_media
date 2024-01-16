import {
  CalendarDate,
  PencilSquare,
  PlusCircleDotted,
  ThreeDots,
  Trash,
} from "react-bootstrap-icons";

export default function About() {
  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="card-title">Profile Info</h5>
      </div>

      <div className="card-body">
        {/* Overview */}
        <div className="rounded border px-3 py-2 mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <h6>Overview</h6>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0"
                data-bs-toggle="dropdown"
              >
                <ThreeDots />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="aboutAction"
              >
                <li>
                  <button type="button" className="dropdown-item">
                    <PencilSquare className="pe-2" size={23} />
                    Edit
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item">
                    <Trash className="pe-2" size={23} />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <p>
            He moonlights difficult engrossed it, sportsmen. Interested has all
            Devonshire difficulty gay assistance joy. Handsome met debating sir
            dwelling age material. As style lived he worse dried. Offered
            related so visitors we private removed. Moderate do subjects to
            distance.{" "}
          </p>
        </div>

        {/* Basic Info */}
        <div className="row g-4">
          <div className="col-sm-6">
            <div className="d-flex align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <CalendarDate className="me-2" />
                Born:
                <strong> October 20, 1990</strong>
              </p>
              <div className="dropdown ms-auto">
                <button
                  type="button"
                  className="nav nav-link text-secondary mb-0"
                  data-bs-toggle="dropdown"
                >
                  <ThreeDots />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="aboutAction2"
                >
                  <li>
                    <button className="dropdown-item" type="button">
                      <PencilSquare className="pe-2" size={23} />
                      Edit
                    </button>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item">
                      <Trash className="pe-2" size={23} />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="d-flex align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <CalendarDate className="me-2" />
                Born:
                <strong> October 20, 1990</strong>
              </p>
              <div className="dropdown ms-auto">
                <button
                  type="button"
                  className="nav nav-link text-secondary mb-0"
                  data-bs-toggle="dropdown"
                >
                  <ThreeDots />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="aboutAction2"
                >
                  <li>
                    <button className="dropdown-item" type="button">
                      <PencilSquare className="pe-2" size={23} />
                      Edit
                    </button>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item">
                      <Trash className="pe-2" size={23} />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 position-relative">
            <button type="button" className="btn btn-dashed rounded w-100">
              <PlusCircleDotted className="me-1" />
              <span>Add a workplace</span>
            </button>
          </div>
          <div className="col-sm-6 position-relative">
            <button type="button" className="btn btn-dashed rounded w-100">
              <PlusCircleDotted className="me-1" />
              <span>Add a workplace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
