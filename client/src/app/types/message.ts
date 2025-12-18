import { FullUser } from "./user";

interface MessageFile {
  id: string;
  url: string;
  type: "image" | "video";
}

export interface Message {
  id: string;
  content: string | null;
  files: MessageFile[];
  user: FullUser;
  conversation: { id: string };
  reads: MessageRead[];
  deletedAt: string | null;
  createdAt: string;
}

interface MessageRead {
  id: string;
  user: FullUser;
  createdAt: string;
}

export interface MessagesResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
}
