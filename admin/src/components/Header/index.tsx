import { Link } from "react-router-dom";
import "./header.scss";
import logo from "@/assets/logo.svg";
import img6 from "@/assets/img6.jpg";
import { ArrowBarLeft, ArrowBarRight, Search } from "react-bootstrap-icons";
import { HeaderProps } from "@/types/header";
import clsx from "clsx";

export default function Header({
  isNavbarOpen,
  setIsNavbarOpen,
  isSidebarCollapsed,
}: HeaderProps) {
  return (
    <header
      className={clsx(
        "navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white",
        isSidebarCollapsed && "navbar-vertical-collapsed"
      )}
    >
      <div className="navbar-nav-wrap">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" />
        </Link>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="navbar-aside-toggler"
            onClick={() => setIsNavbarOpen((prev) => !prev)}
          >
            <ArrowBarRight
              size={16}
              className={clsx(isNavbarOpen && "d-none")}
            />
            <ArrowBarLeft
              size={16}
              className={clsx(!isNavbarOpen && "d-none")}
            />
          </button>
          <div className="dropdown ms-2">
            <button
              type="button"
              className="btn btn-icon btn-ghost-secondary rounded-circle d-lg-none"
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <ul className="navbar-nav">
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <div className="dropdown">
                <button
                  type="button"
                  data-bs-toggle="dropdown"
                  className="btn btn-link p-1"
                  aria-expanded="false"
                  data-bs-auto-close="outside"
                  data-bs-dropdown-animation
                >
                  <div className="avatar avatar-sm">
                    <img
                      className="avatar-img avatar-circle"
                      src={img6}
                      alt="Image Description"
                    />
                    <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                  </div>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-account"
                  style={{
                    width: "14rem",
                    opacity: 1,
                    transform: "translateY(10px) translateY(-10px)",
                    transition: "transform 300ms, opacity 300ms",
                  }}
                >
                  <div className="dropdown-item-text">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm">
                        <img
                          className="avatar-img avatar-circle"
                          src={img6}
                          alt="Image Description"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-0">Mark Williams</h5>
                        <p className="card-text text-body">mark@site.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Profile &amp; account
                  </a>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>

                  <div className="dropdown-divider"></div>

                  <Link className="dropdown-item" to="/signout">
                    Sign out
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
