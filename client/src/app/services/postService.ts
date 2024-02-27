import { Post, PostResponse } from "../types/post";
import apiRequest from "./api";

const postService = {
  create: async (formData: FormData, acessToken: string) => {
    return apiRequest<PostResponse>("/posts/create", "POST", {
      body: formData,
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    });
  },

  getAll: async (accessToken: string) => {
    return apiRequest<Post[]>("/posts", "GET", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  delete: async (id: string, accessToken: string) => {
    return apiRequest<{ message: string }>(`/posts/delete/${id}`, "DELETE", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default postService;
