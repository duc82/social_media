import { Link } from "react-router-dom";
import "./header.scss";
import logo from "@/assets/logo.svg";
import img6 from "@/assets/img6.jpg";
import { ArrowBarLeft, ArrowBarRight, Search } from "react-bootstrap-icons";
import { NavbarProps } from "@/types/navbar";
import clsx from "clsx";

export default function Header({ isNavbarOpen, setIsNavbarOpen }: NavbarProps) {
  return (
    <div className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white">
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
            <li className="nav-item d-none d-sm-inline-block"></li>
            <li className="nav-item d-none d-sm-inline-block"></li>
            <li className="nav-item d-none d-sm-inline-block"></li>
            <li className="nav-item">
              <div className="dropdown">
                <button type="button" className="btn p-1">
                  <div className="avatar avatar-sm">
                    <img
                      className="avatar-img avatar-circle"
                      src={img6}
                      alt="Image Description"
                    />
                    <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
