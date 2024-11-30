"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GroupMenu() {
  const pathname = usePathname();

  return (
    <ul
      className="nav nav-tabs nav-bottom-line justify-content-center justify-content-md-start mb-4"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        {" "}
        <Link
          className={clsx("nav-link", pathname === "/groups" && "active")}
          href="/groups"
        >
          {" "}
          Your feed
        </Link>{" "}
      </li>
      <li className="nav-item" role="presentation">
        {" "}
        <Link
          className={clsx(
            "nav-link",
            pathname === "/groups/suggested" && "active"
          )}
          href="/groups/suggested"
        >
          {" "}
          Suggested for you{" "}
        </Link>{" "}
      </li>
      <li className="nav-item" role="presentation">
        {" "}
        <Link
          className={clsx(
            "nav-link",
            pathname === "/groups/joined" && "active"
          )}
          href="/groups/joined"
        >
          {" "}
          Your groups
        </Link>{" "}
      </li>
    </ul>
  );
}
