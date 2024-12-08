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
  call?: Call;
  deletedAt: string | null;
  createdAt: string;
}

export interface Call {
  id: string;
  type: "video" | "audio";
  status: "success" | "failed";
  duration: number;
  caller: FullUser;
  callee: FullUser;
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
