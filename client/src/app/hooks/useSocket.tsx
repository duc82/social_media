"use client";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../context/SocketContext";
import { ISocket } from "../types/socket";
import { io } from "socket.io-client";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<ISocket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string, {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  return useContext(SocketContext);
}
