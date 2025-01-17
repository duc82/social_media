import { Socket } from "socket.io-client";
import { Friend } from "./user";
import { Message } from "./message";

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
  conversationId: string;
}

export interface ConversationPayload {
  id: string;
  type: "add" | "remove";
}

export interface EndCall {
  conversation: string;
  callType: "video" | "audio";
  callStatus: "failed" | "success";
  callerId: string;
  calleeId: string;
  isCallee: boolean;
  room: string;
}

interface ServerToClientEvents {
  message: (_data: Message) => void;
  conversation: (_data: ConversationPayload) => void;
  friendRequest: (_data: FriendRequest) => void;
  onlines: (_data: Online[]) => void;
  conversationUnread: (_data: string) => void;
  incomingCall: (_data: CallUser) => void;
  endCall: () => void;
  callRejected: (_data: CallUser) => void;
}

interface ClientToServerEvents {
  message: (_data: Message) => void;
  conversation: (_data: ConversationPayload) => void;
  friendRequest: (_data: FriendRequest) => void;
  conversationUnread: () => void;
  joinCall: (_room: string) => void;
  outgoingCall: (_data: CallUser) => void;
  endCall: (_data: EndCall) => void;
  rejectCall: (_data: CallUser) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
