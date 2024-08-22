"use client";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PencilSquare, Search } from "react-bootstrap-icons";
import { Conversation } from "@/app/types/conversation";
import { useEffect, useState } from "react";
import { FullUser } from "@/app/types/user";
import ConversationItem from "./ConversationItem";
import useSocketContext from "@/app/hooks/useSocketContext";

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
  const [conversations, setConversations] = useState(initialConversations);
  const [total, setTotal] = useState(inititalTotal);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleConversation = (
      conversation: Conversation,
      type: "add" | "remove"
    ) => {
      if (type === "add") {
        setConversations((prev) => [conversation, ...prev]);
        setTotal((prev) => prev + 1);
      } else {
        setConversations((prev) =>
          prev.filter((c) => c.id !== conversation.id)
        );
        setTotal((prev) => prev - 1);
      }
    };

    socket.on("conversation", handleConversation);

    return () => {
      socket.off("conversation", handleConversation);
    };
  }, [socket]);

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
              <button
                type="button"
                className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link"
                data-bs-toggle="modal"
                data-bs-target="#addChatModal"
              >
                <PencilSquare />
              </button>
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
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    currentUser={currentUser}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
