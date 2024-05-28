import { getAllConversation } from "@/app/actions/conversationAction";
import ChatSidebar from "@/app/components/Messages/ChatSidebar";
import getServerSession from "@/app/libs/session";

export default async function ChatLayout({
  children,
}: React.PropsWithChildren) {
  const { accessToken, currentUser } = await getServerSession();

  const { conversations, total } = await getAllConversation(accessToken);

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
