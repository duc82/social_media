import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import logo from "@/assets/logo.svg";
import {
  ArrowBarLeft,
  ArrowBarRight,
  BrightnessHigh,
  CircleHalf,
  InfoCircle,
  Moon,
} from "react-bootstrap-icons";
import { NavbarProps } from "@/types/header";
import clsx from "clsx";
import { menus } from "@/data/menus";
import useCollapse from "@/hooks/useCollapse";

export default function Navbar({
  isNavbarOpen,
  setIsNavbarOpen,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isXl,
}: NavbarProps) {
  const pathname = useLocation().pathname;

  const { listRef } = useCollapse({ isSidebarCollapsed });

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
          <ul
            className="nav nav-pills nav-vertical card-navbar-nav"
            ref={listRef}
          >
            {menus.map((menu, i) => {
              if (menu.children) {
                return (
                  <li key={i} className="nav-item w-100">
                    <button
                      type="button"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${menu.label}Collapse`}
                      className={clsx(
                        "nav-link dropdown-toggle",
                        pathname === menu.href && "active"
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
                  </li>
                );
              }

              return (
                <li key={i} className="nav-item w-100">
                  <Link
                    to={menu.href || ""}
                    className={clsx(
                      "nav-link dropdown-toggle",
                      pathname === menu.href && "active"
                    )}
                  >
                    {menu.icon && <menu.icon width={16} height={16} />}
                    <span className="navbar-link-title ms-3">{menu.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar-vertical-footer">
          <ul className="navbar-vertical-footer-list">
            <li className="navbar-vertical-footer-list-item dropup">
              <button
                type="button"
                className="btn btn-ghost-secondary btn-icon rounded-circle"
                id="selectThemeDropdown"
                data-bs-toggle="dropdown"
                data-bs-dropdown-animation
              >
                <BrightnessHigh />
              </button>
              <div
                className="dropdown-menu navbar-dropdown-menu-borderless"
                aria-labelledby="selectThemeDropdown"
              >
                <button type="button" className="dropdown-item active">
                  <CircleHalf className="me-2" />
                  <span className="text-truncate" title="Auto">
                    Auto
                  </span>
                </button>
                <button type="button" className="dropdown-item">
                  <BrightnessHigh className="me-2" />
                  <span className="text-truncate" title="Light">
                    Light
                  </span>
                </button>
                <button type="button" className="dropdown-item">
                  <Moon className="me-2" />
                  <span className="text-truncate" title="Dark">
                    Dark
                  </span>
                </button>
              </div>
            </li>
            <li className="navbar-vertical-footer-list-item">
              <div className="dropdown dropup">
                <button
                  type="button"
                  className="btn btn-ghost-secondary btn-icon rounded-circle"
                >
                  <InfoCircle />
                </button>
              </div>
            </li>
            <li className="navbar-vertical-footer-list-item dropup">
              <button
                type="button"
                className="btn btn-ghost-secondary btn-icon rounded-circle"
                id="selectLanguageDropdown"
                data-bs-toggle="dropdown"
                data-bs-dropdown-animation
              >
                <img src="https://flagcdn.com/16x12/us.webp" alt="Flag" />
              </button>
              <div className="dropdown-menu navbar-dropdown-menu-borderless">
                <span className="dropdown-header">Select language</span>
                <button className="dropdown-item">
                  <img
                    src={"https://flagcdn.com/16x12/us.webp"}
                    alt="Flag"
                    className="me-2"
                  />
                  <span className="text-truncate" title="English">
                    English
                  </span>
                </button>
                <button className="dropdown-item">
                  <img
                    src={"https://flagcdn.com/16x12/vn.webp"}
                    alt="Flag"
                    className="me-2"
                  />
                  <span className="text-truncate" title="Vietnamese">
                    Vietnamese
                  </span>
                </button>
                <button className="dropdown-item">
                  <img
                    src={"https://flagcdn.com/16x12/cn.webp"}
                    alt="Flag"
                    className="me-2"
                  />
                  <span className="text-truncate" title="Chinese">
                    Chinese
                  </span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
