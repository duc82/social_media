import { Options } from "../types";
import { Post, PostResponse, PostsReponse } from "../types/post";
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

  getAll: async (options: Options) => {
    const { page = 1, limit = 10, search = "", userId } = options;

    let url = `/posts?page=${page}&limit=${limit}&search=${search}`;

    if (userId) {
      url += `&userId=${userId}`;
    }

    return apiRequest<PostsReponse>(url, "GET");
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