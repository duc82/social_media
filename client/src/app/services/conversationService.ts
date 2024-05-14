import { Conversation, ConversationsReponse } from "../types/conversation";
import apiRequest from "./api";

const conversationService = {
  getAll: async (accessToken: string) => {
    return apiRequest<ConversationsReponse>(`/conversations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getByUser: async (id: string, accessToken: string) => {
    return apiRequest<Conversation>(`/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default conversationService;
