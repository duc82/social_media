import { Options } from "../types";
import {
  CommentResponse,
  CommentsResponse,
  Post,
  PostResponse,
  PostsReponse,
} from "../types/post";
import apiRequest from "./api";

const postService = {
  create: async (formData: FormData, token: string): Promise<PostResponse> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/create`,
        true
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          console.log(percent);
        }
      };

      xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        console.log({ status: xhr.status, data });
        if (xhr.status === 201) {
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error or failed to upload."));
      };

      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formData);
    });
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

  getById: async (id: string, token: string, options?: Options) => {
    return apiRequest<Post>(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: options?.tags },
    });
  },

  getByUserId: async (userId: string, token: string, options?: Options) => {
    const { page = 1, limit = 20, search = "" } = options || {};

    return apiRequest<PostsReponse>(
      `/posts/users/${userId}?page=${page}&limit=${limit}&search=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { tags: options?.tags },
      }
    );
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

  getReplies: async (commentId: string, token: string, options?: Options) => {
    const { page = 1, limit = 3 } = options || {};

    return apiRequest<CommentsResponse>(
      `/posts/comments/replies/${commentId}?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { tags: options?.tags },
      }
    );
  },

  count: async (token: string) => {
    return apiRequest<number>("/posts/count", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  countComments: async (postId: string) => {
    return apiRequest<number>(`/posts/comments/count/${postId}`);
  },

  like: async (id: string, token: string) => {
    return apiRequest<{ message: string }>(`/posts/like/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  unlike: async (id: string, token: string) => {
    return apiRequest<{ message: string }>(`/posts/unlike/${id}`, {
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
    return apiRequest<{ message: string }>(`/posts/comment/like/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  unlikeComment: async (id: string, token: string) => {
    return apiRequest<{ message: string }>(`/posts/comment/unlike/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  replyComment: async (id: string, content: string, token: string) => {
    return apiRequest<CommentResponse>(`/posts/comment/reply/${id}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
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
