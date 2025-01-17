import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import logo from "@/assets/logo.svg";
import { ArrowBarLeft, ArrowBarRight } from "react-bootstrap-icons";
import { NavbarProps } from "@/types/header";
import clsx from "clsx";
import { menus } from "@/data/menus";

export default function Navbar({
  isNavbarOpen,
  setIsNavbarOpen,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isXl,
}: NavbarProps) {
  const pathname = useLocation().pathname;

  return (
    <nav
      className={clsx(
        "navbar navbar-vertical navbar-vertical-fixed navbar-bordered bg-white",
        isXl && isSidebarCollapsed && "collapsed",
        !isXl && isNavbarOpen && "show"
      )}
    >
      <div className="navbar-vertical-footer-offset">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" />
        </Link>

        <button
          type="button"
          className={clsx(
            "navbar-aside-toggler",
            !isXl && (isNavbarOpen ? "opacity-100" : "opacity-0")
          )}
          onClick={() =>
            isXl
              ? setIsSidebarCollapsed((prev) => !prev)
              : setIsNavbarOpen((prev) => !prev)
          }
        >
          <ArrowBarLeft
            size={16}
            className={clsx(
              isXl && isSidebarCollapsed && "d-none",
              !isXl && !isNavbarOpen && "d-none"
            )}
          />
          <ArrowBarRight
            size={16}
            className={clsx(
              isXl && !isSidebarCollapsed && "d-none",
              !isXl && isNavbarOpen && "d-none"
            )}
          />
        </button>
        <div className="navbar-vertical-content">
          <ul className="nav nav-pills nav-vertical card-navbar-nav">
            {menus.map((menu, i) => (
              <li key={i} className="nav-item w-100">
                {menu.children ? (
                  <>
                    <button
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${menu.label}Collapse`}
                      aria-controls={`${menu.label}Collapse`}
                      aria-expanded="false"
                      className={clsx(
                        "nav-link",
                        isXl && !isSidebarCollapsed && "dropdown-toggle",
                        !isXl && "dropdown-toggle"
                      )}
                    >
                      {menu.icon && <menu.icon width={16} height={16} />}
                      <span className="navbar-link-title ms-3">
                        {menu.label}
                      </span>
                    </button>
                    <ul
                      className="nav-collapse collapse"
                      id={`${menu.label}Collapse`}
                    >
                      {menu.children.map((child, j) => (
                        <Link
                          to={child.href || ""}
                          key={j}
                          className={clsx(
                            "nav-link",
                            child.href === pathname && "active"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={menu.href || ""} className="nav-link">
                    {menu.icon && <menu.icon width={16} height={16} />}
                    <span className="navbar-link-title ms-3">{menu.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
