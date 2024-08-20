import { Message } from "./message";
import { FullUser } from "./user";

export interface ConversationMember {
  id: string;
  user: FullUser;
  role: "admin" | "moderator" | "member";
  isRead: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  members: ConversationMember[];
  messages: Message[];
  deletedAt: string | null;
  createdAt: Date;
}

export interface ConversationsReponse {
  conversations: Conversation[];
  page: number;
  limit: number;
  total: number;
}
