"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu({ userId }: { userId: string }) {
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
          href="/friends"
          className={clsx("nav-link", pathname === "/friends" && "active")}
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
