"use client";
import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Calendar2Plus,
  GeoAlt,
  PatchCheckFill,
  PencilFill,
  PlusLg,
} from "react-bootstrap-icons";

export default function HeaderMainProfile() {
  const pathname = usePathname();
  const menus = [
    {
      title: "Posts",
      href: "/profile",
    },
    {
      title: "About",
      href: "/profile/about",
    },
    {
      title: "Friends",
      href: "/profile/friends",
    },
    {
      title: "Media",
      href: "/profile/media",
    },
    {
      title: "Videos",
      href: "/profile/videos",
    },
    {
      title: "Events",
      href: "/profile/events",
    },
    {
      title: "Activity",
      href: "/profile/activity",
    },
  ];

  return (
    <div className="card">
      <div className="position-relative w-100" style={{ height: "200px" }}>
        <Image src="/01.jpg" fill alt="Wallpaper" className="rounded-top" />
      </div>

      <div className="card-body py-0">
        <div className="d-md-flex align-items-start text-center text-md-start">
          <Avatar
            src="/07.jpg"
            alt="Avatar"
            wrapperClassName="avatar avatar-xxl mt-n5 mb-3"
            className="rounded-circle border border-3 border-white "
          />

          <div className="ms-md-4 mt-md-3">
            <h1 className="mb-0 h5">
              Sam Lanson <PatchCheckFill className="text-success small" />
            </h1>
            <p>250 friends</p>
          </div>

          <div className="d-flex mt-3 justify-content-center ms-md-auto">
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center me-2"
            >
              <PlusLg className="pe-1" />
              Add to story
            </button>
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center me-2"
            >
              <PencilFill className="pe-1" />
              Edit profile
            </button>
            <div className="dropdown">
              <button
                type="button"
                className="icon-md btn btn-light"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" href="#">
                    <i className="bi bi-bookmark fa-fw pe-2"></i>Share profile
                    in a message
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    <i className="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save
                    your profile to PDF
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    <i className="bi bi-lock fa-fw pe-2"></i>Lock profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    <i className="bi bi-gear fa-fw pe-2"></i>Profile settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ul className="list-inline mb-0 text-center text-md-start mt-3 mt-md-0">
          <li className="list-inline-item d-inline-flex align-items-center">
            <Briefcase className="me-1" /> Lead Developer
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <GeoAlt className="me-1" /> New Hampshire
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <Calendar2Plus className="me-1" /> Joined on Nov 26, 2019
          </li>
        </ul>
      </div>

      <div className="card-footer mt-3 pt-2 pb-0">
        <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
          {menus.map((menu) => (
            <li key={menu.href} className="nav-item">
              <Link
                className={clsx("nav-link", pathname === menu.href && "active")}
                href={menu.href}
              >
                {menu.title}

                {menu.title === "Friends" && (
                  <span className="badge bg-success bg-opacity-10 text-success small">
                    230
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
