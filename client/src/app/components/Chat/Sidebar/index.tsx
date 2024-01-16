import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Search } from "react-bootstrap-icons";
import Avatar from "../../Avatar";

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
            <div className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0">
              <form className="position-relative">
                <input
                  className="form-control py-2"
                  type="search"
                  placeholder="Search for chats"
                  aria-label="Search"
                />
                <button
                  className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                  type="submit"
                >
                  <Search size={18} />
                </button>
              </form>

              <div className="mt-4 h-100">
                <ul className="nav flex-column nav-pills nav-pills-soft">
                  <li data-bs-dismiss="offcanvas">
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
        </div>
      </nav>
    </div>
  );
}
