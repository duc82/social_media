import { Socket } from "socket.io-client";
import { Friend, FullUser } from "./user";
import { Message } from "./message";
import { Notification } from "./notification";

interface FriendRequest {
  userId: string;
  friend: Friend | null;
}

export interface Online {
  socketId: string;
  userId: string;
}

export interface Typing {
  isTyping: boolean;
  conversationId: string;
  fullName: string;
}

export interface ConversationPayload {
  id: string;
  type: "add" | "remove";
}

interface ServerToClientEvents {
  message: (_data: Message) => void;
  conversation: (_data: ConversationPayload) => void;
  friendRequest: (_data: FriendRequest) => void;
  onlines: (_data: Online[]) => void;
  conversationUnread: (_data: string) => void;
  notification: (_data: Notification) => void;
  typing: (_data: Typing) => void;
}

interface ClientToServerEvents {
  message: (_data: Message) => void;
  conversation: (_data: ConversationPayload) => void;
  friendRequest: (_data: FriendRequest) => void;
  conversationUnread: () => void;
  typing: (_data: Typing) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
