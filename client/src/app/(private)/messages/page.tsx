import ChatSidebar from "@/app/components/Messages/ChatSidebar";
import Conversation from "@/app/components/Messages/Conversation";

export default function Messages() {
  return (
    <div className="row gx-0">
      <ChatSidebar />
      <Conversation />
    </div>
  );
}
