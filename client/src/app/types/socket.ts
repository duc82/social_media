import { Socket } from "socket.io-client";

interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
}

interface ISocket extends Socket<ServerToClientEvents, ClientToServerEvents> {}

export type { ISocket };
