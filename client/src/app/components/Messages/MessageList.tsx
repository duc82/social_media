"use client";

import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { Message } from "@/app/types/message";
import InfiniteScroll from "observer-infinite-scroll";
import { getMessagesByConversation } from "@/app/actions/messageAction";
import { useParams } from "next/navigation";
import useSocket from "@/app/hooks/useSocket";
import { FullUser } from "@/app/types/user";
import { useSession } from "next-auth/react";
import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
  useOverlayScrollbars,
} from "overlayscrollbars-react";

interface MessageListProps {
  currentUser: FullUser;
  initialMessages: Message[];
  initialPage: number;
  limit: number;
  total: number;
}

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
  const { id } = useParams();
  const { socket } = useSocket();
  const { data } = useSession();
  const accessToken = data?.accessToken;
  const messageEndRef = useRef<HTMLDivElement>(null);

  const fetchMore = async () => {
    if (!accessToken) return;
    try {
      const { messages } = await getMessagesByConversation(id as string, {
        limit,
        page,
      });

      if (messages.length === 0) {
        setHasMore(false);
        return;
      }

      setMessages((prev) => [...messages, ...prev]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  useEffect(() => {
    const messageEnd = messageEndRef.current;
    if (messageEnd) {
      messageEnd.scrollIntoView({
        behavior: "instant",
      });
    }
  }, []);

  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: { autoHide: "leave", autoHideDelay: 200 },
        overflow: {
          x: "visible-hidden",
          y: "scroll",
        },
      }}
      defer
      style={{
        height: "calc(100vh - 19.5rem)",
      }}
    >
      <InfiniteScroll
        hasMore={hasMore}
        fetchMore={fetchMore}
        position="top"
        loader={
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading messages</p>
          </div>
        }
        endMessage={
          total > limit ? (
            <p className="text-center">No more messages to load</p>
          ) : (
            <></>
          )
        }
      >
        {messages.map((message, i) => {
          return (
            <MessageItem
              key={message.id}
              message={message}
              isMessageCurrentUser={message.user.id === currentUser.id}
              isNext={
                Boolean(messages[i + 1]) &&
                messages[i + 1].user.id === message.user.id
              }
              lastMessage={messages[messages.length - 1]}
              stepLimit={limit * i}
              index={i}
            />
          );
        })}
        {/* <div ref={messageEndRef}></div> */}
      </InfiniteScroll>
    </OverlayScrollbarsComponent>
  );
}
