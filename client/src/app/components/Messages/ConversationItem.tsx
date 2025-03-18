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
import { Typing } from "@/app/types/socket";

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
  const [typing, setTyping] = useState<Typing>({
    conversationId: "",
    fullName: "",
    isTyping: false,
  });

  const [lastMessage, setLastMessage] = useState<Message | null>(
    conversation.messages.length > 0 ? conversation.messages[0] : null
  );
  const lastMessageFile = useMemo(
    () =>
      lastMessage && lastMessage.files.length > 0 ? lastMessage.files[0] : null,
    [lastMessage]
  );

  const member = useMemo(
    () =>
      conversation.members.find((member) => member.user.id !== currentUser?.id),
    [conversation.members, currentUser]
  );
  const user = member?.user;

  const isOnline = onlines.some((online) => online.userId === user?.id);

  useEffect(() => {
    if (!socket) return;

    const handleLastMessage = (message: Message) => {
      setLastMessage(message);
    };

    const handleTyping = (typing: Typing) => {
      if (typing.conversationId !== conversation.id) return;
      setTyping(typing);
    };

    socket.on("message", handleLastMessage);

    socket.on("typing", handleTyping);

    return () => {
      socket.off("message", handleLastMessage);
      socket.off("typing", handleTyping);
    };
  }, [socket, conversation.id]);

  return (
    <li className="mb-3">
      <Link
        href={`/messages/${conversation.id}`}
        className={clsx(
          "nav-link d-flex align-items-center",
          pathname === `/messages/${conversation.id}` && "active"
        )}
      >
        <div
          className={clsx(
            "avatar flex-shrink-0 me-2",
            isOnline ? "status-online" : "status-offline"
          )}
        >
          {user && (
            <Avatar
              className="rounded-circle"
              src={user.profile.avatar}
              alt={user.fullName}
            />
          )}
        </div>

        <div
          style={{
            maxWidth: "calc(100% - 56px)",
          }}
        >
          <h6 className="mb-0 mt-1 text-truncate">
            {conversation.isGroup ? conversation.name : user?.fullName}
          </h6>
          <div className="small text-secondary text-truncate">
            {typing.isTyping && `${typing.fullName} is typing ...`}
            {!typing.isTyping && !lastMessage && "Created a new conversation"}
            {!typing.isTyping &&
              lastMessage &&
              !lastMessageFile &&
              lastMessage.content}
            {!typing.isTyping &&
              lastMessage &&
              lastMessageFile &&
              (lastMessageFile.type === "image" ? "Image" : "Video")}
          </div>
        </div>
      </Link>
    </li>
  );
}
