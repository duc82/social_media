import { Options } from "../types";
import { PostDto, PostResponse, PostsReponse } from "../types/post";
import apiRequest from "./api";

const postService = {
  create: async (body: PostDto, token: string) => {
    return apiRequest<PostResponse>("/posts/create", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAll: async (options: Partial<Options>) => {
    const { page = 1, limit = 10, search = "", userId } = options;

    let url = `/posts?page=${page}&limit=${limit}&search=${search}`;

    if (userId) {
      url += `&userId=${userId}`;
    }

    return apiRequest<PostsReponse>(url, { next: { tags: options.tags } });
  },

  like: async (id: string, token: string) => {
    return apiRequest<PostResponse>(`/posts/like/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  delete: async (id: string, token: string) => {
    return apiRequest<{ message: string }>(`/posts/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default postService;
