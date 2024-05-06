"use client";
import { useEffect, useState } from "react";
import { ISocket } from "../types/socket";
import { io } from "socket.io-client";
import SocketContext from "../contexts/SocketContext";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<ISocket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL as string, {
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
