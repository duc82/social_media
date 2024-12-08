"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { ISocket, Online } from "../types/socket";
import { io } from "socket.io-client";

interface SocketContextState {
  socket: ISocket | null;
  onlines: Online[];
}

export const SocketContext = createContext<SocketContextState>({
  socket: null,
  onlines: [],
});

export function SocketProvider({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) {
  const [socket, setSocket] = useState<ISocket | null>(null);
  const [onlines, setOnlines] = useState<Online[]>([]);

  useEffect(() => {
    const newSocket: ISocket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      auth: {
        token,
      },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    const handleOnlines = (data: Online[]) => {
      setOnlines(data);
    };

    newSocket.on("onlines", handleOnlines);

    return () => {
      newSocket.off("onlines", handleOnlines);
    };
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlines,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
