import { PropsWithChildren } from "react";
import StreamVideoProvider from "../providers/StreamVideoProvider";
import IncomingCallModal from "../components/RingingCall/IncomingCallModal";
import { SocketProvider } from "../providers/SocketProvider";
import ChatToast from "../components/Messages/ChatToast";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      <StreamVideoProvider>
        <IncomingCallModal />
        {children}
        <ChatToast />
      </StreamVideoProvider>
    </SocketProvider>
  );
}
