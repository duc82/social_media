"use server";

import getServerSession from "../libs/session";
import messageService from "../services/messageService";
import { Options } from "../types";

export const getMessagesByConversation = async (
  id: string,
  options?: Options
) => {
  const { accessToken } = await getServerSession();

  return messageService.getByConversation(id, accessToken, options);
};
