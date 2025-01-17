import { Story, StoryResponse } from "../types/story";
import apiRequest from "./api";

const storyService = {
  create: async (formData: FormData, token: string) => {
    return apiRequest<StoryResponse>("/stories/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      isFormData: true,
    });
  },

  getStories: async (token: string) => {
    return apiRequest<StoryResponse>("/stories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default storyService;
