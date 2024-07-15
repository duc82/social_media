import { Socket } from "socket.io-client";
import { Friend } from "./user";
import { Message } from "./message";

interface FriendRequest {
  userId: string;
  friend: Friend | null;
}

interface Online {
  socketId: string;
  userId: string;
}

interface ServerToClientEvents {
  message: (_data: Message) => void;
  friendRequest: (_data: FriendRequest) => void;
  onlines: (_data: Online[]) => void;
}

interface ClientToServerEvents {
  message: (_data: Message) => void;
  friendRequest: (_data: FriendRequest) => void;
}

interface ISocket extends Socket<ServerToClientEvents, ClientToServerEvents> {}

export type { ISocket, Online };
