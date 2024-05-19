"use client";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PencilSquare, Search } from "react-bootstrap-icons";
import Avatar from "../Avatar";
import { Conversation } from "@/app/types/conversation";
import { useState } from "react";
import { FullUser } from "@/app/types/user";
import { usePathname } from "next/navigation";
import useSocket from "@/app/hooks/useSocket";
import clsx from "clsx";

interface ChatSidebarProps {
  initialConversations: Conversation[];
  inititalTotal: number;
  currentUser: FullUser;
}

export default function ChatSidebar({
  initialConversations,
  inititalTotal,
  currentUser,
}: ChatSidebarProps) {
  const [conversations, setConversation] = useState(initialConversations);
  const [total, setTotal] = useState(inititalTotal);
  const pathname = usePathname();
  const { onlines } = useSocket();

  return (
    <div className="col-lg-4 col-xxl-3">
      <div className="d-flex align-items-center mb-4 d-lg-none">
        <button
          type="button"
          className="border-0 bg-transparent"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <span className="btn btn-primary">
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          <span className="h6 mb-0 fw-bold d-lg-none ms-2">Chats</span>
        </button>
      </div>

      <div className="card card-body border-end-0 border-bottom-0 rounded-bottom-0 rounded-end-0">
        <div className=" d-flex justify-content-between align-items-center">
          <h1 className="h5 mb-0">
            Active chats{" "}
            <span className="badge bg-success bg-opacity-10 text-success">
              {total}
            </span>
          </h1>
          <div className="dropend position-relative">
            <div className="nav">
              <Link
                className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link toast-btn"
                data-target="chatToast"
                href="#"
              >
                <PencilSquare />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-light navbar-expand-lg mx-0">
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasNavbar"
          role="dialog"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn btn-close text-reset ms-auto"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body p-0">
            <div
              className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0 rounded-end-0"
              style={{
                height: "calc(100vh - 1.5rem - 10.1rem)",
              }}
            >
              <form className="position-relative">
                <label htmlFor="searchChats" className="visually-hidden">
                  Search Chats
                </label>
                <input
                  type="input"
                  placeholder="Search for chats"
                  id="searchChats"
                  className="form-control"
                  style={{ paddingRight: "36px" }}
                />
                <button
                  type="submit"
                  className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                >
                  <Search size={18} />
                </button>
              </form>

              <ul className="nav flex-column flex-nowrap overflow-y-auto nav-pills nav-pills-soft mt-4">
                {conversations.map((conversation) => {
                  const member = conversation.members.find(
                    (member) => member.user.id !== currentUser?.id
                  );
                  const user = member?.user;

                  const isOnline = onlines.some(
                    (online) => online.userId === user?.id
                  );

                  return (
                    <li key={conversation.id} className="mb-3">
                      <Link
                        href={`/messages/${conversation.id}`}
                        className={clsx(
                          "nav-link text-start",
                          pathname === `/messages/${conversation.id}` &&
                            "active"
                        )}
                      >
                        <div className="d-flex">
                          <Avatar
                            wrapperClassName={clsx(
                              "flex-shrink-0 me-2",
                              isOnline ? "status-online" : "status-offline"
                            )}
                            className="avatar-img rounded-circle"
                            src={user?.profile.avatar || ""}
                            alt={user?.fullName}
                          />
                          <div className="flex-grow-1 d-block">
                            <h6 className="mb-0 mt-1">
                              {conversation.isGroup
                                ? conversation.name
                                : user?.fullName}
                            </h6>
                            <div className="small text-secondary">
                              {conversation.messages.length > 0 &&
                                `${
                                  conversation.messages[0].user.id ===
                                  currentUser.id
                                    ? "You"
                                    : conversation.messages[0].user.fullName
                                } sent a message.`}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
