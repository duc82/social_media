import { getConversationById } from "@/app/actions/conversationAction";
import { getMessagesByConversation } from "@/app/actions/messageAction";
import MessageList from "@/app/components/Messages/MessageList";
import SendForm from "@/app/components/Messages/SendForm";
import TopAvatarStatus from "@/app/components/Messages/TopAvatarStatus";
import getServerSession from "@/app/libs/session";

export default async function Messages({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { accessToken, currentUser } = await getServerSession();

  const conversation = await getConversationById(id, accessToken);

  const user = conversation.members.find(
    (m) => m.user.id !== currentUser.id
  )?.user;

  const { messages, page, total, limit } = await getMessagesByConversation(
    conversation.id
  );

  return (
    <div className="col-lg-8 col-xxl-9">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0 h-100">
        <div className="card-body">
          {/* Top avatar and status */}
          <TopAvatarStatus user={user} />
          <hr />
          {/* Messages */}
          <MessageList
            initialMessages={messages}
            initialPage={page + 1}
            currentUser={currentUser}
            total={total}
            limit={limit}
          />
        </div>
        <div className="card-footer">
          <SendForm />
        </div>
      </div>
    </div>
  );
}
