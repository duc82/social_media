"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../Avatar";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FullUser } from "@/app/types/user";
import clsx from "clsx";
import useSocketToken from "@/app/hooks/useSocketContext";
import { formatDateTime } from "@/app/utils/dateTime";

import { markMessagesAsRead } from "@/app/actions/messageAction";
import { Conversation } from "@/app/types/conversation";
import conversationService from "@/app/services/conversationService";
import useSocketContext from "@/app/hooks/useSocketContext";
import { useParams } from "next/navigation";

interface TopAvatarStatusProps {
  user?: FullUser;
  conversation: Conversation;
  token: string;
  currentUser: FullUser;
}

export default function TopAvatarStatus({
  user,
  conversation,
  token,
  currentUser,
}: TopAvatarStatusProps) {
  const { onlines } = useSocketToken();
  const { socket } = useSocketContext();
  const { id: conversationId } = useParams();

  const isOnline = onlines.some((online) => online.userId === user?.id);

  const openRingingCall = (hasVideo: boolean) => {
    if (!user || !socket) return;

    const room = `${currentUser.id}-${user.id}`;

    socket.emit("outgoingCall", {
      callerId: currentUser.id,
      calleeId: user.id,
      hasVideo,
      room,
      conversationId: conversation.id,
    });

    const width = 1280;
    const height = 720;

    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;

    window.open(
      `/ringing-call?hasVideo=${hasVideo}&calleeId=${user.id}&conversationId=${conversationId}`,
      "_blank",
      `location=yes,scrollbars=yes,status=yes,width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleMarkAsRead = async () => {
    await markMessagesAsRead(conversation.id);
  };

  const handleRemove = async () => {
    await conversationService.remove(conversation.id, token);
    if (socket) {
      socket.emit("conversation", { id: conversation.id, type: "remove" });
    }
  };

  return (
    <div className="d-sm-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center mb-2 mb-sm-0">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
          className="btn btn-link p-0 border-0 me-2 d-flex flex-shrink-0"
        >
          <div className="avatar">
            <Avatar
              className="rounded-circle"
              src={user?.profile.avatar || ""}
              alt={user?.fullName}
            />
          </div>
        </button>

        <div>
          <h6 className="mb-0 mt-1">{user?.fullName}</h6>

          <div className="small">
            <FontAwesomeIcon
              icon={faCircle}
              className={clsx(
                "me-1",
                isOnline ? "text-success" : "text-danger"
              )}
            />
            {isOnline
              ? "Online"
              : user?.offlineAt
              ? `Last active ${formatDateTime(user.offlineAt)}`
              : "Offline"}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button
          type="button"
          onClick={() => openRingingCall(false)}
          className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Audio call"
        >
          <i className="bi bi-telephone-fill"></i>
        </button>
        <button
          type="button"
          className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Video call"
          onClick={() => openRingingCall(true)}
        >
          <i className="bi bi-camera-video-fill"></i>
        </button>
        <div className="dropdown">
          <button
            type="button"
            className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={handleMarkAsRead}
              >
                <i className="bi bi-check-lg me-2 fw-icon"></i>
                Mark as read
              </button>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <i className="bi bi-mic-mute me-2 fw-icon"></i>
                Mute conversation
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                href={`/profile/@${user?.username}`}
              >
                <i className="bi bi-person-check me-2 fw-icon"></i>
                View profile
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={handleRemove}
              >
                <i className="bi bi-trash me-2 fw-icon"></i>
                Delete chat
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
