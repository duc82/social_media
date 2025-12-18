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
};

export default storyService;
