"use client";

import { revalidatePath } from "@/app/actions/indexAction";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface FriendMenu {
  title: string;
  icon: ReactNode;
  link: string;
}

const friendMenus: FriendMenu[] = [
  {
    title: "Home",
    icon: <i className="bi bi-people-fill"></i>,
    link: "/friends",
  },
  {
    title: "Friend Requests",
    icon: <i className="bi bi-person-fill-exclamation"></i>,
    link: "/friends/requests",
  },
  {
    title: "Suggestions",
    icon: <i className="bi bi-person-plus-fill"></i>,
    link: "/friends/suggestions",
  },
  {
    title: "All Friends",
    icon: <i className="bi bi-person-lines-fill"></i>,
    link: "/friends/list",
  },
];

const FriendSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="d-none d-md-block col-md-4 col-lg-3">
      <div
        className="navbar navbar-expand-lg mx-0 position-sticky"
        style={{ top: "calc(1.5rem + 56px)" }}
      >
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Friends</h4>
            <ul className="nav nav-pills-soft flex-coloumn fw-bold gap-2">
              {friendMenus.map((menu) => (
                <li className="nav-item w-100" key={menu.title}>
                  <Link
                    href={menu.link}
                    onClick={() => {
                      revalidatePath(pathname || "");
                    }}
                    className={clsx(
                      "nav-link d-flex align-items-center px-2 rounded-2",
                      menu.link === pathname && "active"
                    )}
                  >
                    <div
                      className="svg-circle rounded-circle d-flex justify-content-center align-items-center me-2"
                      style={{ width: 36, height: 36 }}
                    >
                      {menu.icon}
                    </div>
                    <span>{menu.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendSidebar;
