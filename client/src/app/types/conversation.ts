import { Message } from "./message";
import { FullUser } from "./user";

interface ConversationMember {
  id: string;
  user: FullUser;
  role: "admin" | "moderator" | "member";
}

interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  members: ConversationMember[];
  messages: Message[];
  deleteAt: string | null;
  createdAt: Date;
}

interface ConversationsReponse {
  conversations: Conversation[];
  page: number;
  limit: number;
  total: number;
}

export type { Conversation, ConversationsReponse };
