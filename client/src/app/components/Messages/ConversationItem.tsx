"use client";
import useSocket from "@/app/hooks/useSocket";
import { Conversation } from "@/app/types/conversation";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Avatar from "../Avatar";
import { useEffect, useState } from "react";
import { Message } from "@/app/types/message";
import { FullUser } from "@/app/types/user";
import Link from "next/link";

interface ConversationItemProps {
  conversation: Conversation;
  currentUser: FullUser;
}

export default function ConversationItem({
  conversation,
  currentUser,
}: ConversationItemProps) {
  const pathname = usePathname();
  const { onlines, socket } = useSocket();
  const [lastMessage, setLastMessage] = useState<Message>(
    conversation.messages[0]
  );

  const member = conversation.members.find(
    (member) => member.user.id !== currentUser?.id
  );
  const user = member?.user;

  const isOnline = onlines.some((online) => online.userId === user?.id);

  useEffect(() => {
    if (!socket) return;
    const handleLastMessage = (message: Message) => {
      setLastMessage(message);
    };

    socket.on("message", handleLastMessage);

    return () => {
      socket.off("message", handleLastMessage);
      socket.disconnect();
    };
  }, [socket]);

  return (
    <li className="mb-3">
      <Link
        href={`/messages/${conversation.id}`}
        className={clsx(
          "nav-link text-start",
          pathname === `/messages/${conversation.id}` && "active"
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
              {conversation.isGroup ? conversation.name : user?.fullName}
            </h6>
            <div className="small text-secondary">{lastMessage.content}</div>
          </div>
        </div>
      </Link>
    </li>
  );
}
