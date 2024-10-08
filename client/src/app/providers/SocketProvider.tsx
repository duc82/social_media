"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { ISocket, Online } from "../types/socket";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";

interface SocketContextState {
  socket: ISocket | null;
  onlines: Online[];
}

export const SocketContext = createContext<SocketContextState>({
  socket: null,
  onlines: [],
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<ISocket | null>(null);
  const [onlines, setOnlines] = useState<Online[]>([]);
  const { data } = useSession();
  const token = data?.token;

  useEffect(() => {
    if (!token) return;

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
