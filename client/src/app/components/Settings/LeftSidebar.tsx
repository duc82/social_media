import Image from "next/image";
import Link from "next/link";
import person_outline_filled from "@/app/assets/images/person-outline-filled.svg";
import notification_outlined_filled from "@/app/assets/images/notification-outlined-filled.svg";
import shield_outline_filled from "@/app/assets/images/shield-outline-filled.svg";
import handshake_outline_filled from "@/app/assets/images/handshake-outline-filled.svg";
import chat_alt_outline_filled from "@/app/assets/images/chat-alt-outline-filled.svg";
import trash_var_outline_filled from "@/app/assets/images/trash-var-outline-filled.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

export default function LeftSidebar() {
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
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link d-flex mb-0 active"
                      href="/settings"
                    >
                      <Image
                        className="me-2 fa-fw img-fluid"
                        src={person_outline_filled}
                        height={20}
                        alt="Account"
                      />
                      <span>Account </span>
                    </Link>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link d-flex mb-0"
                      href="/settings/notification"
                    >
                      <Image
                        className="me-2 fa-fw img-fluid"
                        src={notification_outlined_filled}
                        height={20}
                        alt="Notification"
                      />
                      <span>Notification </span>
                    </Link>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link d-flex mb-0"
                      href="/settings/privacy-safety"
                    >
                      {" "}
                      <Image
                        className="me-2 fa-fw img-fluid"
                        src={shield_outline_filled}
                        height={20}
                        alt="Privacy and safety"
                      />
                      <span>Privacy and safety </span>
                    </Link>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link d-flex mb-0"
                      href="/settings/communications"
                    >
                      <Image
                        className="me-2 fa-fw img-fluid"
                        src={handshake_outline_filled}
                        height={20}
                        alt="Communications"
                      />
                      <span>Communications </span>
                    </Link>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link d-flex mb-0"
                      href="/settings/messaging"
                    >
                      {" "}
                      <Image
                        className="me-2 fa-fw img-fluid"
                        src={chat_alt_outline_filled}
                        height={20}
                        alt="Messaging"
                      />
                      <span>Messaging </span>
                    </Link>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link d-flex mb-0"
                      href="/settings/close-account"
                    >
                      <Image
                        className="me-2 fa-fw img-fluid"
                        src={trash_var_outline_filled}
                        height={20}
                        alt="Close account"
                      />
                      <span>Close account </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="card-footer text-center py-2">
                <Link href="/" className="btn btn-link text-secondary btn-sm">
                  View Profile{" "}
                </Link>
              </div>
            </div>
          </div>

          <ul className="nav small mt-4 justify-content-center lh-1">
            <li className="nav-item">
              <a className="nav-link" href="my-profile-about.html">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="settings.html">
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                target="_blank"
                href="https://support.webestica.com/login"
              >
                Support{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" target="_blank" href="docs/index.html">
                Docs{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="help.html">
                Help
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="privacy-and-terms.html">
                Privacy &amp; terms
              </a>
            </li>
          </ul>

          <p className="small text-center mt-1">
            ©2024{" "}
            <a
              className="text-reset"
              target="_blank"
              href="https://www.webestica.com/"
            >
              {" "}
              Webestica{" "}
            </a>
          </p>
        </div>
      </nav>
    </aside>
  );
}
