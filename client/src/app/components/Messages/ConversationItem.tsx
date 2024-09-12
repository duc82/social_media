"use client";
import useSocketContext from "@/app/hooks/useSocketContext";
import { Conversation } from "@/app/types/conversation";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Avatar from "../Avatar";
import { useEffect, useMemo, useState } from "react";
import { Message } from "@/app/types/message";
import { FullUser } from "@/app/types/user";
import Link from "next/link";
import formatName from "@/app/utils/formatName";

interface ConversationItemProps {
  conversation: Conversation;
  currentUser: FullUser;
}

export default function ConversationItem({
  conversation,
  currentUser,
}: ConversationItemProps) {
  const pathname = usePathname();
  const { onlines, socket } = useSocketContext();

  const [lastMessage, setLastMessage] = useState<Message | null>(
    conversation.messages.length > 0 ? conversation.messages[0] : null
  );
  const lastMessageFile = useMemo(
    () =>
      lastMessage && lastMessage.files.length > 0 ? lastMessage.files[0] : null,
    [lastMessage]
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
    };
  }, [socket]);

  const fullName = formatName(user?.firstName ?? "", user?.lastName ?? "");

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
          <div
            className={clsx(
              "avatar flex-shrink-0 me-2",
              isOnline ? "status-online" : "status-offline"
            )}
          >
            <Avatar
              className="avatar-img rounded-circle"
              src={user?.profile.avatar || ""}
              alt={fullName}
            />
          </div>

          <div className="flex-grow-1 d-block">
            <h6 className="mb-0 mt-1">
              {conversation.isGroup ? conversation.name : fullName}
            </h6>
            <div className="small text-secondary">
              {!lastMessage && "Created a new conversation"}
              {lastMessage && !lastMessageFile && lastMessage.content}
              {lastMessage &&
                lastMessageFile &&
                (lastMessageFile.type === "image" ? "Image" : "Video")}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
