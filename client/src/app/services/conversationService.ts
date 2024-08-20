import { Options } from "../types";
import { Conversation, ConversationsReponse } from "../types/conversation";
import apiRequest from "./api";

const conversationService = {
  getAll: async (token: string) => {
    return apiRequest<ConversationsReponse>(`/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getByUser: async (id: string, token: string) => {
    return apiRequest<Conversation>(`/conversations/by-user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getById: async (id: string, token: string) => {
    return apiRequest<Conversation>(`/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  countUnread: async (token: string, tags?: string[]) => {
    return apiRequest<number>("/conversations/count/unread", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags },
    });
  },

  remove: async (id: string, token: string) => {
    return apiRequest<{ message: string }>(`/conversations/remove/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default conversationService;
