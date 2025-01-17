import { getAllConversation } from "@/app/actions/conversationAction";
import ChatSidebar from "@/app/components/Messages/ChatSidebar";
import CreateChatToast from "@/app/components/Messages/CreateChatToast";
import getServerSession from "@/app/libs/session";
import { PropsWithChildren } from "react";

export default async function ChatLayout({ children }: PropsWithChildren) {
  const { currentUser, token } = await getServerSession();

  const { conversations, total } = await getAllConversation({
    tags: ["conversations"],
  });

  return (
    <>
      <CreateChatToast token={token} />
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
