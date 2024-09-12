"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { Message } from "@/app/types/message";
import { useParams } from "next/navigation";
import useSocketContext from "@/app/hooks/useSocketContext";
import { FullUser } from "@/app/types/user";
import { useSession } from "next-auth/react";
import messageService from "@/app/services/messageService";
import InfiniteScroll from "observer-infinite-scroll";
import { markMessagesAsRead } from "@/app/actions/messageAction";
import { revalidateTag } from "@/app/actions/indexAction";

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
  const params = useParams();
  const id = params.id as string;
  const { socket } = useSocketContext();
  const { data } = useSession();
  const token = data?.token;
  const ref = useRef<HTMLDivElement>(null);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const fetchMore = async () => {
    if (!token) return;

    try {
      const { messages } = await messageService.getByConversation(id, token, {
        limit,
        page,
      });

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

    const handleMessage = async (message: Message) => {
      if (message.conversation.id !== id) return;

      setMessages((prev) => [...prev, message]);
      if (message.user.id === currentUser.id) {
        setIsScrollBottom(true);
      } else {
        await markMessagesAsRead(message.conversation.id);
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, currentUser, id]);

  useLayoutEffect(() => {
    if (isScrollBottom && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      setIsScrollBottom(false);
    }
  }, [isScrollBottom]);

  useEffect(() => {
    revalidateTag("headerConversationUnread");
  }, []);

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
