import getServerSession from "../libs/session";
import { Options } from "../types";
import { CreateMessageDto, Message, MessagesResponse } from "../types/message";
import apiRequest from "./api";

const messageService = {
  async getByConversation(id: string, accessToken: string, options?: Options) {
    const query = options
      ? `?limit=${options.limit}&page=${options.page}&search=${
          options.search || ""
        }`
      : "";
    return apiRequest<MessagesResponse>(
      `/messages/by-conversation/${id}${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  async countUnseen() {
    const { accessToken } = await getServerSession();
    return apiRequest<number>(`/messages/count-unseen`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async send(body: CreateMessageDto, accessToken: string) {
    return apiRequest<Message>("/messages/create", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default messageService;
