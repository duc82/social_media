import Link from "next/link";
import Avatar from "../Avatar";

export default function NotificationsDropdown() {
  return (
    <div
      className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-0"
      style={{ minWidth: "22rem" }}
    >
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h6 className="m-0">
            Notifications
            <span className="badge text-danger bg-danger bg-opacity-10 ms-2">
              4 new
            </span>
          </h6>
          <a role="button" className="small">
            Clear all
          </a>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush p-2">
            {/* Unread notification */}
            <li>
              <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                <div className="avatar text-center d-none d-sm-inline-block">
                  <Avatar
                    className="rounded-circle"
                    src="/01.jpg"
                    alt="Avatar"
                  />
                </div>
                <div className="ms-sm-3">
                  <div className=" d-flex">
                    <p className="small mb-2">
                      <b>Judy Nguyen</b> sent you a friend request.
                    </p>
                    <p className="small ms-3 text-nowrap">Just now</p>
                  </div>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-sm py-1 btn-primary me-2"
                    >
                      Accept{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm py-1 btn-danger-soft"
                    >
                      Delete{" "}
                    </button>
                  </div>
                </div>
              </div>
            </li>

            {/* Read notification */}
            <li>
              <a
                role="button"
                className="list-group-item list-group-item-action rounded d-flex border-0 mb-1 p-3"
              >
                <div className="avatar text-center d-none d-sm-inline-block">
                  <div className="avatar-img rounded-circle bg-success">
                    <span className="text-white position-absolute top-50 start-50 translate-middle fw-bold">
                      WB
                    </span>
                  </div>
                </div>
                <div className="ms-sm-3">
                  <div className="d-flex">
                    <p className="small mb-2">
                      Webestica has 15 like and 1 new activity
                    </p>
                    <p className="small ms-3">1hr</p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="card-footer text-center">
          <Link
            href="/notifications"
            title="See all notifications"
            className="btn btn-sm btn-primary-soft"
          >
            See all incoming activity
          </Link>
        </div>
      </div>
    </div>
  );
}
