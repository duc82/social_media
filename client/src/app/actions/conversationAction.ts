"use server";

import { notFound, redirect } from "next/navigation";
import conversationService from "../services/conversationService";

export const directMessage = async (
  id: string,
  accessToken: string
): Promise<void> => {
  const conversation = await conversationService.getByUser(id, accessToken);
  redirect(`/messages/${conversation.id}`);
};

export const getAllConversation = async (accessToken: string) => {
  const data = await conversationService.getAll(accessToken);
  return data;
};

export const getConversationById = async (id: string, accessToken: string) => {
  try {
    const data = await conversationService.getById(id, accessToken);
    return data;
  } catch (error) {
    notFound();
  }
};
