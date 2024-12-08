import { Socket } from "socket.io-client";
import { Friend } from "./user";
import { Call, Message } from "./message";

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
  incomingCall: (_data: CallUser) => void;
  endCall: () => void;
  callRejected: (_data: CallUser) => void;
  remoteCamOn: (_isOn: boolean) => void;
}

interface ClientToServerEvents {
  message: (_data: Message) => void;
  conversation: (_data: ConversationPayload) => void;
  friendRequest: (_data: FriendRequest) => void;
  conversationUnread: () => void;
  joinCall: (_room: string) => void;
  outgoingCall: (_data: CallUser) => void;
  endCall: (_data: any) => void;
  rejectCall: (_data: CallUser) => void;
  remoteCamOn: (_isOn: boolean) => void;
}

export interface ISocket
  extends Socket<ServerToClientEvents, ClientToServerEvents> {}
