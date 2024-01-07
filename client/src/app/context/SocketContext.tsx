import { createContext } from "react";
import { ISocket } from "../types/socket";

const SocketContext = createContext<ISocket | null>(null);

export default SocketContext;
