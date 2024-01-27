"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function ProfileMainHeaderMenu() {
  const pathname = usePathname();

  return (
    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
      {menus.map((menu) => (
        <li key={menu.href} className="nav-item">
          <Link
            className={clsx("nav-link", pathname === menu.href && "active")}
            href={menu.href}
          >
            {menu.title}{" "}
            {menu.title === "Friends" && (
              <span className="badge bg-success bg-opacity-10 text-success small">
                230
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
