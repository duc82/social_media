"use server";

import { notFound, redirect } from "next/navigation";
import conversationService from "../services/conversationService";
import getServerSession from "../libs/session";

export const directMessage = async (id: string): Promise<void> => {
  const { accessToken } = await getServerSession();
  const conversation = await conversationService.getByUser(id, accessToken);
  redirect(`/messages/${conversation.id}`);
};

export const getAllConversation = async () => {
  const { accessToken } = await getServerSession();
  const data = await conversationService.getAll(accessToken);
  return data;
};

export const getConversationById = async (id: string) => {
  try {
    const { accessToken } = await getServerSession();
    const data = await conversationService.getById(id, accessToken);
    return data;
  } catch (error) {
    notFound();
  }
};
