import { PropsWithChildren } from "react";
import SocketProvider from "../providers/SocketProvider";
import StreamVideoProvider from "../providers/StreamVideoProvider";
import IncomingCallModal from "../components/RingingCall/IncomingCallModal";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      <StreamVideoProvider>
        <IncomingCallModal />
        {children}
      </StreamVideoProvider>
    </SocketProvider>
  );
}
