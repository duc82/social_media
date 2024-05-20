"use server";

import getServerSession from "../libs/session";
import messageService from "../services/messageService";
import { Options } from "../types";
import { CreateMessageDto } from "../types/message";

export const getMessagesByConversation = async (
  id: string,
  options?: Options
) => {
  const { accessToken } = await getServerSession();

  return messageService.getByConversation(id, accessToken, options);
};

export const sendMessage = async (body: CreateMessageDto) => {
  const { accessToken } = await getServerSession();

  return messageService.send(body, accessToken);
};
