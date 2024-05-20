"use client";

import { FullUser } from "@/app/types/user";
import MessageList from "./MessageList";
import TopAvatarStatus from "./TopAvatarStatus";
import { Message } from "@/app/types/message";
import clsx from "clsx";
import { useState } from "react";

interface ChatBodyProps {
  user?: FullUser;
  initialMessages: Message[];
  initialPage: number;
  currentUser: FullUser;
  limit: number;
  total: number;
}

export default function ChatBody({
  user,
  initialMessages,
  initialPage,
  currentUser,
  limit,
  total,
}: ChatBodyProps) {
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  return (
    <div className={clsx("fade", isScrollBottom && "show")}>
      {/* Top avatar and status */}
      <TopAvatarStatus user={user} />
      <hr />
      {/* Messages */}
      <MessageList
        initialMessages={initialMessages}
        initialPage={initialPage}
        currentUser={currentUser}
        limit={limit}
        total={total}
        setIsScrollBottom={setIsScrollBottom}
      />
    </div>
  );
}
