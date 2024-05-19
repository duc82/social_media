import { Socket } from "socket.io-client";
import { Friendship } from "./user";
import { Message } from "./message";

interface FriendRequest {
  userId: string;
  friendship: Friendship | null;
}

interface Online {
  socketId: string;
  userId: string;
}

interface ServerToClientEvents {
  message: (data: Message) => void;
  friendRequest: (data: FriendRequest) => void;
  onlines: (data: Online[]) => void;
}

interface ClientToServerEvents {
  message: (data: Message) => void;
  friendRequest: (data: FriendRequest) => void;
}

interface ISocket extends Socket<ServerToClientEvents, ClientToServerEvents> {}

export type { ISocket, Online };
