"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu() {
  const pathname = usePathname();

  return (
    <ul className="navbar-nav ms-auto mx-lg-auto">
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
          className={clsx(
            "nav-link",
            pathname.includes("/friends") && "active"
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
      <li className="nav-item">
        <Link
          href="/blogs"
          className={clsx("nav-link", pathname === "/blogs" && "active")}
        >
          Blogs
        </Link>
      </li>
    </ul>
  );
}
