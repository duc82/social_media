import { Options } from "../types";
import { CreateMessageDto, Message, MessagesResponse } from "../types/message";
import apiRequest from "./api";

const messageService = {
  async getByConversation(id: string, token: string, options?: Options) {
    const query = options
      ? `?limit=${options.limit}&page=${options.page}&search=${
          options.search || ""
        }`
      : "";
    return apiRequest<MessagesResponse>(
      `/messages/by-conversation/${id}${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: options?.tags },
      }
    );
  },

  async markAsRead(conversationId: string, token: string) {
    return apiRequest<{ message: string }>(
      `/messages/mark-as-read/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  async send(body: CreateMessageDto, token: string) {
    return apiRequest<Message>("/messages/create", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default messageService;
