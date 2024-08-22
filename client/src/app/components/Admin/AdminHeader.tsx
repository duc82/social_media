import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardText, GearFill, LifePreserver } from "react-bootstrap-icons";
import Avatar from "../Avatar";
import ButtonSignOut from "../Header/ButtonSignOut";
import { FullUser } from "@/app/types/user";
import dynamic from "next/dynamic";
import logo from "@/app/assets/images/logo.svg";
import formatName from "@/app/utils/formatName";

const SwitchTheme = dynamic(() => import("../Header/SwitchTheme"), {
  ssr: false,
});

interface AdminHeaderProps {
  currentUser: FullUser;
}

export default function AdminHeader({ currentUser }: AdminHeaderProps) {
  const fullName = formatName(currentUser.firstName, currentUser.lastName);

  return (
    <header className="navbar fixed-top navbar-expand-lg bg-mode">
      <div className="container">
        <button
          type="button"
          title="Menu"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          className="navbar-toggler icon-md btn btn-light p-0 collapsed"
        >
          <span className="navbar-toggler-animation">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <Link href="/" className="navbar-brand me-0">
          <Image src={logo} alt="Logo" width={36} height={36} />
        </Link>

        <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
          <li className="nav-item ms-2 dropdown">
            <button
              type="button"
              className="nav-link icon-md btn p-0"
              data-bs-toggle="dropdown"
            >
              <Avatar src={currentUser.profile.avatar} alt={fullName} />
            </button>

            <ul className="dropdown-menu dropdown-menu-end pt-3 small me-md-n3 shadow-menu">
              <li className="px-3">
                <div className="d-flex align-items-center">
                  <Avatar
                    src={currentUser.profile.avatar}
                    alt={fullName}
                    width={48}
                    height={48}
                    className="rounded-circle"
                    wrapperClassName="me-3"
                  />
                  <div>
                    <h6 className="mb-1">{fullName}</h6>
                    {currentUser.profile.job && (
                      <p className="small m-0">{currentUser.profile.job}</p>
                    )}
                  </div>
                </div>

                <Link
                  href={`/profile/${currentUser.id}`}
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
    </header>
  );
}
