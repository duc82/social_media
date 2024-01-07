"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";
import useTooltip from "@/app/hooks/useTooltip";
const SwitchTheme = dynamic(() => import("./SwitchTheme"), { ssr: false });

export default function Header() {
  useTooltip();
  const pathname = usePathname();

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-mode">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>

        {/* Menu */}
        <button
          type="button"
          title="Menu"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          className="navbar-toggler ms-auto icon-md btn btn-light p-0 collapsed"
        >
          <span className="navbar-toggler-animation">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Collapse */}
        <div className="navbar-collapse collapse" id="navbarCollapse">
          {/* Nav Search */}
          <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
            <form className="position-relative w-100">
              <input
                type="search"
                className="form-control ps-5 bg-light"
                placeholder="Search..."
                aria-label="Search"
              />
              <button
                type="submit"
                className="position-absolute top-50 start-0 btn bg-transparent px-2 py-0 translate-middle-y"
              >
                <i className="bi bi-search fs-5"></i>
              </button>
            </form>
          </div>

          <ul className="navbar-nav navbar-nav-scroll ms-auto mx-lg-auto">
            <li className="nav-item">
              <Link
                href="/"
                className={clsx("nav-link", pathname === "/" && "active")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/profile/friends"
                className={clsx(
                  "nav-link",
                  pathname === "/profile/friends" && "active"
                )}
              >
                Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/groups"
                className={clsx("nav-link", pathname === "/groups" && "active")}
              >
                Groups
              </Link>
            </li>
          </ul>
        </div>

        <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
          <li className="nav-item ms-2">
            <Link
              href="/chats"
              className="nav-link bg-light icon-md btn btn-light p-0"
            >
              <i className="bi bi-chat-left-text-fill fs-6"></i>
            </Link>
          </li>
          <li className="nav-item ms-2">
            <Link
              href="/settings"
              className="nav-link bg-light icon-md btn btn-light p-0"
            >
              <i className="bi bi-gear-fill fs-6"></i>
            </Link>
          </li>
          <li className="nav-item ms-2">
            <button
              type="button"
              className="nav-link bg-light icon-md btn btn-light p-0 position-relative"
            >
              <i className="bi bi-bell-fill fs-6"></i>
              <span
                className="position-absolute top-0 p-1 bg-danger rounded-circle"
                style={{ right: "-3px" }}
              ></span>
            </button>
          </li>
          <li className="nav-item ms-2 dropdown">
            <button
              type="button"
              className="nav-link icon-md btn p-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Avatar src="/07.jpg" />
            </button>

            <ul className="dropdown-menu dropdown-menu-end pt-3 small me-md-n3 shadow-menu">
              <li className="px-3">
                <div className="d-flex align-items-center">
                  <Avatar
                    src="/07.jpg"
                    width={48}
                    height={48}
                    className="rounded-circle"
                    wrapperClassName="me-3"
                  />
                  <div>
                    <h6 className="mb-1">Duc Dang</h6>
                    <p className="small m-0">Web Developer</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center fw-medium"
                >
                  View profile
                </Link>
              </li>
              <li>
                <Link href="/settings" className="dropdown-item">
                  <i className="bi bi-gear me-2"></i>
                  Settings & Privacy
                </Link>
              </li>
              <li>
                <Link href="/support" className="dropdown-item">
                  <i className="bi bi-life-preserver me-2"></i>
                  Support
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="dropdown-item">
                  <i className="bi bi-card-text me-2"></i>
                  Documentation
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link href="/signout" className="dropdown-item">
                  <i className="bi bi-power me-2"></i>
                  Sign Out
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="d-flex align-items-center justify-content-center gap-3 p-2">
                <span>Mode:</span>
                <SwitchTheme />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
