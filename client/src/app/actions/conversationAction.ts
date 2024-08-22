"use server";

import { notFound, redirect } from "next/navigation";
import conversationService from "../services/conversationService";
import getServerSession from "../libs/session";

export const directMessage = async (id: string): Promise<void> => {
  const { token } = await getServerSession();
  const conversation = await conversationService.getByUser(id, token);
  redirect(`/messages/${conversation.id}`);
};

export const getAllConversation = async () => {
  const { token } = await getServerSession();
  const data = await conversationService.getAll(token);
  return data;
};

export const getConversationById = async (id: string) => {
  try {
    const { token } = await getServerSession();
    const data = await conversationService.getById(id, token);
    return data;
  } catch (error) {
    notFound();
  }
};
