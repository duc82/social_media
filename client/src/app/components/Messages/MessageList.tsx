"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { Message } from "@/app/types/message";
import { useParams } from "next/navigation";
import useSocket from "@/app/hooks/useSocket";
import { FullUser } from "@/app/types/user";
import { useSession } from "next-auth/react";

import messageService from "@/app/services/messageService";
import InfiniteScroll from "observer-infinite-scroll";

interface MessageListProps {
  currentUser: FullUser;
  initialMessages: Message[];
  initialPage: number;
  limit: number;
  total: number;
}

type Params = {
  id: string;
};

export default function MessageList({
  currentUser,
  initialMessages,
  initialPage,
  limit,
  total,
}: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [hasMore, setHasMore] = useState(total > limit);
  const [page, setPage] = useState(initialPage);
  const { id } = useParams<Params>();
  const { socket } = useSocket();
  const { data } = useSession();
  const accessToken = data?.accessToken;
  const ref = useRef<HTMLDivElement>(null);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const fetchMore = async () => {
    if (!accessToken) return;

    try {
      const { messages } = await messageService.getByConversation(
        id,
        accessToken,
        {
          limit,
          page,
        }
      );

      if (messages.length === 0) {
        setHasMore(false);
        return;
      }

      setMessages((prevMessages) => {
        const newMessages = messages.filter(
          (newMessage) =>
            !prevMessages.some(
              (prevMessage) => prevMessage.id === newMessage.id
            )
        );
        return [...newMessages, ...prevMessages];
      });

      setPage((prev) => prev + 1);
    } catch (error) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
      if (message.user.id === currentUser.id) {
        setIsScrollBottom(true);
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, currentUser]);

  useLayoutEffect(() => {
    if (isScrollBottom && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      setIsScrollBottom(false);
    }
  }, [isScrollBottom]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      fetchMore={fetchMore}
      position="top"
      ref={ref}
      loader={
        <div className="d-flex flex-column justify-content-center align-items-center mb-1">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      endMessage={
        total > limit ? (
          <p className="text-center">No more messages to load</p>
        ) : (
          <></>
        )
      }
      style={{
        overflowY: "auto",
        height: "calc(100vh - 19.5rem)",
      }}
    >
      {messages.map((message, i) => {
        const isSameDay =
          i === 0 ||
          new Date(message.createdAt).toDateString() !==
            new Date(messages[i - 1].createdAt).toDateString();

        const isLastMessage = i === messages.length - 1;

        const isNextSameUser = messages[i + 1]?.user.id === message.user.id;

        const dateDiff =
          new Date(messages[i + 1]?.createdAt).getTime() -
          new Date(message.createdAt).getTime();

        const isLessThan1Hour = dateDiff < 1000 * 60 * 60;

        return (
          <MessageItem
            key={message.id}
            message={message}
            isSameUser={message.user.id === currentUser.id}
            isSameDay={isSameDay}
            isShowStatus={isLastMessage || !isNextSameUser || !isLessThan1Hour}
          />
        );
      })}
    </InfiniteScroll>
  );
}
