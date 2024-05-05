import { Socket } from "socket.io-client";
import { Friendship } from "./user";

interface FriendRequest {
  userId: string;
  friendship: Friendship | null;
}

interface ServerToClientEvents {
  message: (data: string) => void;
  friendRequest: (data: FriendRequest) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
  friendRequest: (data: FriendRequest) => void;
}

interface ISocket extends Socket<ServerToClientEvents, ClientToServerEvents> {}

export type { ISocket };
