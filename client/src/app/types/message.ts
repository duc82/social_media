import { FullUser } from "./user";

interface MessageFile {
  id: string;
  url: string;
  type: "image" | "video";
  conversation: string;
}

interface Message {
  id: string;
  content: string | null;
  seen: boolean;
  files: MessageFile[];
  user: FullUser;
  conversationId: string;
  createdAt: string;
}

interface MessagesResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
}

type MessageFileDto = Pick<MessageFile, "url" & "type">;

interface CreateMessageDto {
  content?: string;
  files?: MessageFileDto[];
  conversation: string;
}

export type { Message, MessagesResponse, CreateMessageDto };
