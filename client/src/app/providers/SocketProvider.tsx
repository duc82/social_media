"use client";
import { useEffect, useState } from "react";
import { ISocket, Online } from "../types/socket";
import { io } from "socket.io-client";
import SocketContext from "../contexts/SocketContext";
import { useSession } from "next-auth/react";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<ISocket | null>(null);
  const [onlines, setOnlines] = useState<Online[]>([]);
  const { data } = useSession();
  const accessToken = data?.accessToken;

  useEffect(() => {
    if (!accessToken) return;

    const newSocket: ISocket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
    });

    setSocket(newSocket);

    const handleOnlines = (data: Online[]) => {
      setOnlines(data);
    };

    newSocket.on("onlines", handleOnlines);

    return () => {
      newSocket.off("onlines", handleOnlines);
      newSocket.disconnect();
    };
  }, [accessToken]);

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
