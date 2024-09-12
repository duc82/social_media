import { Options } from "../types";
import {
  CommentResponse,
  CommentsResponse,
  PostResponse,
  PostsReponse,
} from "../types/post";
import apiRequest from "./api";

const postService = {
  create: async (formData: FormData, token: string): Promise<PostResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/create`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  update: async (
    id: string,
    formData: FormData,
    token: string
  ): Promise<PostResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/update/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  getAll: async (token: string, options?: Options) => {
    const { page = 1, limit = 20, search = "" } = options || {};

    const url = `/posts?page=${page}&limit=${limit}&search=${search}`;

    return apiRequest<PostsReponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: options?.tags },
    });
  },

  getCurrent: async (token: string, options?: Options) => {
    const { page = 1, limit = 20, search = "" } = options || {};

    return apiRequest<PostsReponse>(
      `/posts/current?page=${page}&limit=${limit}&search=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { tags: options?.tags },
      }
    );
  },

  hasLiked: async (postId: string, token: string) => {
    return apiRequest<{ liked: boolean }>(`/posts/likes/liked/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getComments: async (postId: string, token: string, options?: Options) => {
    const { page = 1, limit = 3 } = options || {};

    return apiRequest<CommentsResponse>(
      `/posts/comments/${postId}?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { tags: options?.tags },
      }
    );
  },

  countComments: async (postId: string) => {
    return apiRequest<number>(`/posts/comments/count/${postId}`);
  },

  like: async (id: string, token: string) => {
    return apiRequest<PostResponse>(`/posts/like/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  comment: async (id: string, content: string, token: string) => {
    return apiRequest<CommentResponse>(`/posts/comment/${id}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  likeComment: async (id: string, token: string) => {
    return apiRequest<CommentResponse>(`/posts/comment/like/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  remove: async (id: string, token: string) => {
    return apiRequest<{ message: string }>(`/posts/remove/${id}`, {
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
