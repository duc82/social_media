"use server";

import getServerSession from "../libs/session";
import messageService from "../services/messageService";
import { Options } from "../types";

export const getMessagesByConversation = async (
  id: string,
  options?: Options
) => {
  const { token } = await getServerSession();
  return messageService.getByConversation(id, token, options);
};

export const markMessagesAsRead = async (conversationId: string) => {
  const { token } = await getServerSession();
  const data = await messageService.markAsRead(conversationId, token);
  return data;
};
