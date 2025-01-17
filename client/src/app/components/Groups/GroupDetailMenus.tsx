"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const menus = [
  {
    name: "Feed",
    route: "",
  },
  {
    name: "About",
    route: "about",
  },
  {
    name: "Members",
    route: "members",
  },
  {
    name: "Media",
    route: "media",
  },
  {
    name: "Videos",
    route: "videos",
  },
  {
    name: "Events",
    route: "events",
  },
];

export default function GroupDetailMenus({
  totalMembers,
}: {
  totalMembers: number;
}) {
  const pathname = usePathname();
  const id = useParams().id as string;

  return (
    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
      {menus.map((menu) => {
        const url = menu.route
          ? `/groups/${id}/${menu.route}`
          : `/groups/${id}`;

        return (
          <li key={menu.route} className="nav-item">
            <Link
              className={clsx("nav-link", pathname === url && "active")}
              href={url}
            >
              {menu.name}
              {menu.name === "Members" && (
                <span className="badge bg-success bg-opacity-10 text-success small">
                  {totalMembers}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
