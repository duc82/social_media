"use server";

import { notFound } from "next/navigation";
import conversationService from "../services/conversationService";
import getServerSession from "../libs/session";
import { Conversation } from "../types/conversation";
import { Options } from "../types";

export const directMessage = async (id: string): Promise<Conversation> => {
  const { token } = await getServerSession();
  const conversation = await conversationService.getByUser(id, token);
  return conversation;
};

export const getAllConversation = async (options?: Options) => {
  const { token } = await getServerSession();
  const data = await conversationService.getAll(token, options);
  return data;
};

export const getConversationById = async (id: string) => {
  try {
    const { token } = await getServerSession();
    const data = await conversationService.getById(id, token);
    return data;
  } catch (_error) {
    notFound();
  }
};
