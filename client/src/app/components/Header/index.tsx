import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";
import {
  BellFill,
  CardText,
  ChatLeftTextFill,
  GearFill,
  LifePreserver
} from "react-bootstrap-icons";
import NotificationsDropdown from "./NotificationsDropdown";
import HeaderMenu from "./HeaderMenu";
import getServerSession from "@/app/libs/session";
import HeaderSearch from "./HeaderSearch";
import ButtonSignOut from "./ButtonSignOut";

const SwitchTheme = dynamic(() => import("./SwitchTheme"), { ssr: false });

export default async function Header() {
  const { currentUser } = await getServerSession();

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
          <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
            <HeaderSearch />
          </div>

          <HeaderMenu />
        </div>

        <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
          <li className="nav-item ms-2">
            <Link
              href="/messages"
              title="Messages"
              className="nav-link bg-light icon-md btn btn-light p-0"
            >
              <ChatLeftTextFill className="fs-6" />
            </Link>
          </li>
          <li className="nav-item ms-2">
            <Link
              href="/settings"
              title="Settings"
              className="nav-link bg-light icon-md btn btn-light p-0"
            >
              <GearFill className="fs-6" />
            </Link>
          </li>
          {/* Notifications */}
          <li className="nav-item ms-2 dropdown">
            <button
              type="button"
              title="Notifications"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              className="nav-link bg-light icon-md btn btn-light p-0 position-relative"
            >
              <BellFill className="fs-6" />
              <span
                className="position-absolute top-0 p-1 bg-danger rounded-circle"
                style={{ right: "-3px" }}
              ></span>
            </button>
            <NotificationsDropdown />
          </li>
          <li className="nav-item ms-2 dropdown">
            <button
              type="button"
              className="nav-link icon-md btn p-0"
              data-bs-toggle="dropdown"
            >
              <Avatar
                src={currentUser?.profile.avatar ?? "/01.jpg"}
                alt={currentUser?.fullName}
              />
            </button>

            <ul className="dropdown-menu dropdown-menu-end pt-3 small me-md-n3 shadow-menu">
              <li className="px-3">
                <div className="d-flex align-items-center">
                  <Avatar
                    src={currentUser?.profile.avatar ?? "/07.jpg"}
                    alt={currentUser?.fullName}
                    width={48}
                    height={48}
                    className="rounded-circle"
                    wrapperClassName="me-3"
                  />
                  <div>
                    <h6 className="mb-1">
                      {currentUser?.fullName ?? "Liu Tiu Diu"}
                    </h6>
                    {currentUser?.profile.job && (
                      <p className="small m-0">{currentUser.profile.job}</p>
                    )}
                  </div>
                </div>

                <Link
                  href={`/profile/${currentUser?.id}`}
                  className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center fw-medium"
                >
                  View profile
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  title="Settings"
                  className="dropdown-item"
                >
                  <GearFill className="me-2" />
                  Settings & Privacy
                </Link>
              </li>
              <li>
                <Link href="/support" title="Support" className="dropdown-item">
                  <LifePreserver className="me-2" />
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  title="Documentation"
                  className="dropdown-item"
                >
                  <CardText className="me-2" />
                  Documentation
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <ButtonSignOut />
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
