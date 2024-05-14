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
  createdAt: Date;
}

export type { Message };
