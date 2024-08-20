import { Socket } from "socket.io-client";
import { Friend } from "./user";
import { Message } from "./message";
import { Conversation } from "./conversation";

interface FriendRequest {
  userId: string;
  friend: Friend | null;
}

export interface Online {
  socketId: string;
  userId: string;
}

export interface CallUser {
  callerId: string;
  calleeId: string;
  hasVideo: boolean;
  room: string;
}

interface ServerToClientEvents {
  message: (_data: Message) => void;
  conversation: (_data: Conversation, _type: "add" | "remove") => void;
  friendRequest: (_data: FriendRequest) => void;
  onlines: (_data: Online[]) => void;
  conversationUnread: (_data: string) => void;
  callUser: (_data: CallUser) => void;
  endCall: () => void;
  callRejected: (_data: CallUser) => void;
}

interface ClientToServerEvents {
  message: (_data: Message) => void;
  conversation: (_data: Conversation, _type: "add" | "remove") => void;
  friendRequest: (_data: FriendRequest) => void;
  conversationUnread: () => void;
  joinCall: (_room: string) => void;
  callUser: (_data: CallUser) => void;
  endCall: () => void;
  rejectCall: (_data: CallUser) => void;
}

export interface ISocket
  extends Socket<ServerToClientEvents, ClientToServerEvents> {}
