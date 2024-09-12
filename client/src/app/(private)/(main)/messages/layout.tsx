import { getAllConversation } from "@/app/actions/conversationAction";
import AddChatModal from "@/app/components/Messages/AddChatModal";
import ChatSidebar from "@/app/components/Messages/ChatSidebar";
import getServerSession from "@/app/libs/session";
import { PropsWithChildren } from "react";

export default async function ChatLayout({ children }: PropsWithChildren) {
  const { currentUser } = await getServerSession();

  const { conversations, total } = await getAllConversation({
    tags: ["conversations"],
  });

  return (
    <>
      <AddChatModal />
      <div className="row gx-0">
        <ChatSidebar
          conversations={conversations}
          total={total}
          currentUser={currentUser}
        />
        {children}
      </div>
    </>
  );
}
