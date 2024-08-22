import { PropsWithChildren } from "react";
import { SocketProvider } from "../providers/SocketProvider";
import ChatToast from "../components/Messages/ChatToast";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      {children}
      <ChatToast />
    </SocketProvider>
  );
}
