import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PencilSquare, Search } from "react-bootstrap-icons";
import Avatar from "../Avatar";

export default function ChatSidebar() {
  return (
    <div className="col-lg-4 col-xxl-3">
      <div className="d-flex align-items-center mb-4 d-lg-none">
        <button
          type="button"
          className="border-0 bg-transparent"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <span className="btn btn-primary">
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          <span className="h6 mb-0 fw-bold d-lg-none ms-2">Chats</span>
        </button>
      </div>

      <div className="card card-body border-end-0 border-bottom-0 rounded-bottom-0">
        <div className=" d-flex justify-content-between align-items-center">
          <h1 className="h5 mb-0">
            Active chats{" "}
            <span className="badge bg-success bg-opacity-10 text-success">
              6
            </span>
          </h1>
          <div className="dropend position-relative">
            <div className="nav">
              <a
                className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link toast-btn"
                data-target="chatToast"
                href="#"
              >
                <PencilSquare />
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-light navbar-expand-lg mx-0">
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasNavbar"
          role="dialog"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn btn-close text-reset ms-auto"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body p-0">
            <div
              className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0"
              style={{
                maxHeight: "calc(100vh - 1.5rem - 10.1rem)"
              }}
            >
              <form className="position-relative" method="GET">
                <label htmlFor="searchChats" className="visually-hidden">
                  Search Chats
                </label>
                <input
                  type="input"
                  placeholder="Search for chats"
                  id="searchChats"
                  className="form-control"
                  style={{ paddingRight: "36px" }}
                />
                <button
                  type="submit"
                  className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                >
                  <Search size={18} />
                </button>
              </form>

              <ul className="nav flex-column flex-nowrap overflow-y-auto nav-pills nav-pills-soft mt-4">
                <li data-bs-dismiss="offcanvas" className="mb-3">
                  <Link
                    href="#chat-1"
                    className="nav-link active text-start"
                    id="chat-1-tab"
                    data-bs-toggle="pill"
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                        <Avatar
                          className="avatar-img rounded-circle"
                          src="/01.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex-grow-1 d-block">
                        <h6 className="mb-0 mt-1">Frances Guerrero</h6>
                        <div className="small text-secondary">
                          Frances sent a photo.
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
