"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PeopleFill,
  PersonFillExclamation,
  PersonLinesFill,
  PersonPlusFill,
} from "react-bootstrap-icons";

interface FriendMenu {
  title: string;
  icon: JSX.Element;
  link: string;
}

const friendMenus: FriendMenu[] = [
  {
    title: "Home",
    icon: <PeopleFill width={20} height={20} />,
    link: "/friends",
  },
  {
    title: "Friend Requests",
    icon: <PersonFillExclamation width={20} height={20} />,
    link: "/friends/requests",
  },
  {
    title: "Suggestions",
    icon: <PersonPlusFill width={20} height={20} />,
    link: "/friends/suggestions",
  },
  {
    title: "All Friends",
    icon: <PersonLinesFill width={20} height={20} />,
    link: "/friends/list",
  },
];

const FriendSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="d-none d-md-block col-md-4 col-lg-3 position-sticky">
      <div
        className="navbar navbar-expand-lg mx-0 position-sticky"
        style={{ top: "calc(1.5rem + 56px)" }}
      >
        <div className="card overflow-hidden">
          <div className="card-body">
            <h4 className="card-title">Friends</h4>
            <ul className="nav nav-pills-soft flex-coloumn fw-bold gap-2">
              {friendMenus.map((menu) => (
                <li className="nav-item w-100" key={menu.title}>
                  <Link
                    href={menu.link}
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
