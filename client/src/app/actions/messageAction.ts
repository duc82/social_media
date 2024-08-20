"use server";

import { revalidateTag } from "next/cache";
import getServerSession from "../libs/session";
import messageService from "../services/messageService";
import { Options } from "../types";
import { CreateMessageDto } from "../types/message";

export const getMessagesByConversation = async (
  id: string,
  options?: Options
) => {
  const { token } = await getServerSession();
  return messageService.getByConversation(id, token, options);
};

export const sendMessage = async (body: CreateMessageDto) => {
  const { token } = await getServerSession();

  return messageService.send(body, token);
};

export const markMessagesAsRead = async (conversationId: string) => {
  const { token } = await getServerSession();
  const data = await messageService.markAsRead(conversationId, token);
  revalidateTag("headerConversationUnread");
  return data;
};
