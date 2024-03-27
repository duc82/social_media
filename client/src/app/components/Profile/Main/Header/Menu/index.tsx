"use client";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const menus = [
  {
    title: "Posts",
    route: "",
  },
  {
    title: "About",
    route: "about",
  },
  {
    title: "Friends",
    route: "friends",
  },
  {
    title: "Media",
    route: "media",
  },
  {
    title: "Videos",
    route: "videos",
  },
  {
    title: "Events",
    route: "events",
  },
  {
    title: "Activity",
    route: "activity",
  },
];

export default function ProfileMainHeaderMenu() {
  const pathname = usePathname();
  const id = useParams().id as string;

  return (
    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
      {menus.map((menu) => {
        const url = menu.route
          ? `/profile/${id}/${menu.route}`
          : `/profile/${id}`;

        return (
          <li key={menu.route} className="nav-item">
            <Link
              className={clsx("nav-link", pathname === url && "active")}
              href={url}
            >
              {menu.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
