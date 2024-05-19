import { createContext } from "react";
import { ISocket, Online } from "../types/socket";

interface SocketContextState {
  socket: ISocket | null;
  onlines: Online[];
}

const SocketContext = createContext<SocketContextState>({
  socket: null,
  onlines: [],
});

export default SocketContext;
