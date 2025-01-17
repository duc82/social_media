import { getConversationById } from "@/app/actions/conversationAction";
import {
  getMessagesByConversation,
  markMessagesAsRead,
} from "@/app/actions/messageAction";
import ChatForm from "@/app/components/Messages/ChatForm";
import MessageList from "@/app/components/Messages/MessageList";
import ProfileModal from "@/app/components/Messages/ProfileModal";
import TopAvatarStatus from "@/app/components/Messages/TopAvatarStatus";
import getServerSession from "@/app/libs/session";

export default async function Messages({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { currentUser, token } = await getServerSession();
  const { id } = await params;

  const conversation = await getConversationById(id);

  const user = conversation.members.find(
    (m) => m.user.id !== currentUser.id
  )?.user;

  const { messages, page, limit, total } = await getMessagesByConversation(
    conversation.id,
    { limit: 20, page: 1, tags: ["messages"] }
  );

  await markMessagesAsRead(conversation.id);

  return (
    <div className="col-lg-8 col-xxl-9">
      <ProfileModal user={user} />

      <div className="card card-chat rounded-start-lg-0 border-start-lg-0 h-100">
        <div className="card-body position-relative">
          <TopAvatarStatus
            user={user}
            conversation={conversation}
            token={token}
            currentUser={currentUser}
          />
          <hr />
          <MessageList
            initialMessages={messages}
            initialPage={page + 1}
            currentUser={currentUser}
            limit={limit}
            total={total}
            token={token}
          />
        </div>
        <div className="card-footer">
          <ChatForm token={token} />
        </div>
      </div>
    </div>
  );
}
