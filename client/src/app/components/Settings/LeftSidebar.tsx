"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { settings } from "@/app/data/settings";
import clsx from "clsx";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="col-lg-3">
      <div className="d-flex align-items-center mb-4 d-lg-none">
        <button
          className="border-0 bg-transparent"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="btn btn-primary">
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          <span className="h6 mb-0 fw-bold d-lg-none ms-2">Settings</span>
        </button>
      </div>

      <nav className="navbar navbar-light navbar-expand-lg mx-0">
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasNavbar"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset ms-auto"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body p-0">
            <div className="card w-100">
              <div className="card-body">
                <ul className="nav nav-tabs nav-pills nav-pills-soft flex-column fw-bold gap-2 border-0">
                  {settings.map((setting, i) => (
                    <li
                      className="nav-item"
                      data-bs-dismiss="offcanvas"
                      key={i}
                    >
                      <Link
                        className={clsx(
                          "nav-link border-0 d-flex mb-0",
                          setting.href === pathname && "active"
                        )}
                        href={setting.href}
                      >
                        <Image
                          className="me-2 fa-fw img-fluid"
                          src={setting.icon}
                          height={20}
                          alt="Account"
                        />
                        <span>{setting.title} </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer text-center py-2">
                <Link
                  href="/"
                  className="btn btn-link text-secondary btn-sm p-0"
                >
                  View Profile{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
