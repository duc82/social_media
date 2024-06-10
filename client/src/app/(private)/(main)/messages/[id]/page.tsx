import { getConversationById } from "@/app/actions/conversationAction";
import { getMessagesByConversation } from "@/app/actions/messageAction";
import ChatBody from "@/app/components/Messages/ChatBody";
import ChatForm from "@/app/components/Messages/ChatForm";
import getServerSession from "@/app/libs/session";

export default async function Messages({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { currentUser } = await getServerSession();

  const conversation = await getConversationById(id);

  const user = conversation.members.find(
    (m) => m.user.id !== currentUser.id
  )?.user;

  const { messages, page, limit, total } = await getMessagesByConversation(
    conversation.id
  );

  return (
    <div className="col-lg-8 col-xxl-9">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0 h-100">
        <div className="card-body">
          <ChatBody
            initialMessages={messages}
            initialPage={page + 1}
            currentUser={currentUser}
            limit={limit}
            total={total}
            user={user}
          />
        </div>
        <div className="card-footer">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}
