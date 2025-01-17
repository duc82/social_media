import { PropsWithChildren } from "react";
import { SocketProvider } from "../providers/SocketProvider";
import ChatToast from "../components/Messages/ChatToast";
import getServerSession from "../libs/session";

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const { token } = await getServerSession();

  return (
    <SocketProvider token={token}>
      {children}
      <ChatToast />
    </SocketProvider>
  );
}
