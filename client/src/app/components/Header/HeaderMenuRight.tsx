"use client";

import { FullUser } from "@/app/types/user";
import Link from "next/link";
import NotificationsDropdown from "./NotificationsDropdown";
import Avatar from "../Avatar";
import ButtonSignOut from "./ButtonSignOut";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useSocketContext from "@/app/hooks/useSocketContext";
import { Message } from "@/app/types/message";
import { usePathname } from "next/navigation";
import { revalidateTag } from "@/app/actions/indexAction";

const SwitchThemeNoSSR = dynamic(() => import("./SwitchTheme"), { ssr: false });

export default function HeaderMenuRight({
  currentUser,
  conversationUnread,
}: {
  currentUser: FullUser;
  conversationUnread: number;
}) {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = async (message: Message) => {
      if (
        message.user.id !== currentUser.id &&
        !window.location.pathname.includes("/messages")
      ) {
        await revalidateTag("headerConversationUnread");
      }
    };

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [socket, currentUser]);

  return (
    <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
      <li className="nav-item ms-2">
        <Link
          href="/messages"
          title="Messages"
          className="nav-link bg-light icon-md btn btn-light p-0 position-relative"
        >
          <i className="bi bi-chat-left-text-fill fs-6"></i>
          {conversationUnread > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {conversationUnread > 99 ? "99+" : conversationUnread}
            </span>
          )}
        </Link>
      </li>
      <li className="nav-item ms-2">
        <Link
          href="/settings"
          title="Settings"
          className="nav-link bg-light icon-md btn btn-light p-0"
        >
          <i className="bi bi-gear-fill fs-6"></i>
        </Link>
      </li>
      <li className="nav-item ms-2 dropdown">
        <button
          type="button"
          title="Notifications"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          className="nav-link bg-light icon-md btn btn-light p-0 position-relative"
        >
          <i className="bi bi-bell-fill fs-6"></i>
          <span
            className="position-absolute top-0 p-1 bg-danger rounded-circle"
            style={{ right: "-3px" }}
          ></span>
        </button>
        <NotificationsDropdown />
      </li>

      <li className="nav-item ms-2 dropdown">
        <button
          type="button"
          className="nav-link btn icon-md p-0"
          data-bs-toggle="dropdown"
        >
          <div className="avatar" style={{ width: "2.5rem", height: "2.5rem" }}>
            <Avatar
              src={currentUser.profile.avatar}
              alt={currentUser.fullName}
            />
          </div>
        </button>

        <ul className="dropdown-menu dropdown-menu-end pt-3 small me-md-n3 shadow-menu">
          <li className="px-3">
            <div className="d-flex align-items-center">
              <div className="avatar me-3" style={{ width: 48, height: 48 }}>
                <Avatar
                  src={currentUser.profile.avatar}
                  alt={currentUser.fullName}
                  className="rounded-circle"
                />
              </div>

              <div>
                <h6 className="mb-1">{currentUser.fullName}</h6>
                {currentUser.profile.job && (
                  <p className="small m-0">{currentUser.profile.job}</p>
                )}
              </div>
            </div>

            <Link
              href={`/profile/@${currentUser.username}`}
              className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center fw-medium"
            >
              View profile
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              title="Settings"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="bi bi-gear-fill me-2"></i>
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-terms"
              title="Privacy & Terms"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="bi bi-lock-fill me-2"></i>
              Privacy & Terms
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <ButtonSignOut />
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <li className="d-flex align-items-center justify-content-center gap-3 p-2">
            <span>Mode:</span>
            <SwitchThemeNoSSR />
          </li>
        </ul>
      </li>
    </ul>
  );
}
