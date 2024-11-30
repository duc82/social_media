import { Options } from "../types";
import { Conversation, ConversationsReponse } from "../types/conversation";
import { Message } from "../types/message";
import apiRequest from "./api";

const conversationService = {
  getAll: async (token: string, options?: Options) => {
    let query = "";

    if (options?.page) {
      query += query ? `&page=${options.page}` : `page=${options.page}`;
    }

    if (options?.limit) {
      query += query ? `&limit=${options.limit}` : `limit=${options.limit}`;
    }

    if (options?.search) {
      query += query ? `&search=${options.search}` : `search=${options.search}`;
    }

    return apiRequest<ConversationsReponse>(`/conversations?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: options?.tags },
    });
  },

  createWithMessage: async (formData: FormData, token: string) => {
    return apiRequest<{ conversation: Conversation; message: Message }>(
      `/conversations/create-with-message`,
      {
        method: "POST",
        isFormData: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
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
