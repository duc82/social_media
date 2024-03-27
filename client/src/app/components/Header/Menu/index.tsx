"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu({ userId }: { userId: string }) {
  const pathname = usePathname();

  return (
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
          href={`/profile/${userId}/friends`}
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
  );
}
