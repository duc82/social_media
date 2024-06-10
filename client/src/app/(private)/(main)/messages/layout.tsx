import { getAllConversation } from "@/app/actions/conversationAction";
import ChatSidebar from "@/app/components/Messages/ChatSidebar";
import getServerSession from "@/app/libs/session";
import { PropsWithChildren } from "react";

export default async function ChatLayout({ children }: PropsWithChildren) {
  const { currentUser } = await getServerSession();

  const { conversations, total } = await getAllConversation();

  return (
    <div className="row gx-0">
      <ChatSidebar
        initialConversations={conversations}
        inititalTotal={total}
        currentUser={currentUser}
      />
      {children}
    </div>
  );
}
