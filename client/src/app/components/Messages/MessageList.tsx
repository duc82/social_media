"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageItem from "./MessageItem";
import { Message } from "@/app/types/message";
import InfiniteScroll from "observer-infinite-scroll";
import { useParams } from "next/navigation";
import useSocket from "@/app/hooks/useSocket";
import { FullUser } from "@/app/types/user";
import { useSession } from "next-auth/react";
import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";
import messageService from "@/app/services/messageService";

interface MessageListProps {
  currentUser: FullUser;
  initialMessages: Message[];
  initialPage: number;
  limit: number;
  total: number;
  setIsScrollBottom: Dispatch<SetStateAction<boolean>>;
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
  setIsScrollBottom,
}: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [hasMore, setHasMore] = useState(total > limit);
  const [page, setPage] = useState(initialPage);
  const { id } = useParams<Params>();
  const { socket } = useSocket();
  const { data } = useSession();
  const accessToken = data?.accessToken;
  const osComponentRef = useRef<OverlayScrollbarsComponentRef<"div">>(null);
  const [isMessageCurrentUser, setIsMessageCurrentUser] = useState(false);

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
      console.log(error);
    }
  };

  const scrollToBottom = useCallback(() => {
    if (!isMessageCurrentUser) return;

    const osElement = osComponentRef.current?.osInstance()?.elements().viewport;

    if (osElement) {
      const scrollHeight = osElement.scrollHeight;
      osElement.scrollTo({ top: scrollHeight });
    }
  }, [isMessageCurrentUser]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);

      if (message.user.id === currentUser.id) {
        setIsMessageCurrentUser(true);
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: "leave",
          autoHideDelay: 200,
        },
        overflow: {
          x: "visible-hidden",
          y: "scroll",
        },
      }}
      events={{
        initialized(instance) {
          const osElement = instance.elements().viewport;
          const scrollHeight = osElement.scrollHeight;
          osElement.scrollTo({ top: scrollHeight });
          setIsScrollBottom(true);
        },
      }}
      style={{
        height: "calc(100vh - 19.5rem)",
      }}
      ref={osComponentRef}
    >
      <InfiniteScroll
        hasMore={hasMore}
        fetchMore={fetchMore}
        position="top"
        threshold={0}
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
      </InfiniteScroll>
    </OverlayScrollbarsComponent>
  );
}
