import { Options } from "../types";
import { ChangePasswordDto } from "../types/auth";
import { UserStoriesResponse } from "../types/story";
import type {
  FriendsResponse,
  Friend,
  FriendStatus,
  FullUser,
  UsersReponse,
  UserResponse,
  BlockedsResponse,
  BlockedResponse,
} from "../types/user";
import apiRequest from "./api";

export type GetFriendsOptions = Omit<Options, "userId">;

const userService = {
  getAll: async (token: string, options?: Options) => {
    const { limit = 20, page = 1, search = "", exclude = "[]" } = options || {};

    const query = `?limit=${limit}&page=${page}&search=${search}&exclude=${exclude}`;

    return apiRequest<UsersReponse>(`/users${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUserProfile: async (username: string, token: string) => {
    return apiRequest<FullUser>(`/users/${username}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getCurrent: async (token: string) => {
    return apiRequest<FullUser>("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getById: async (id: string, token: string) => {
    return apiRequest<FullUser>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getStories: async (token: string, options?: Options) => {
    const { limit = 20, page = 1 } = options || {};
    return apiRequest<UserStoriesResponse>(
      `/users/stories?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: options?.tags,
        },
      }
    );
  },

  getBlocked: async (token: string, options?: Options) => {
    const { limit = 20, page = 1, search = "" } = options || {};

    const query = `?limit=${limit}&page=${page}&search=${search}`;

    return apiRequest<BlockedsResponse>(`/users/blocked${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  block: async (blockedId: string, token: string) => {
    return apiRequest<BlockedResponse>("/users/block", {
      method: "POST",
      body: JSON.stringify({ blockedId }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  unblock: async (blockedId: string, token: string) => {
    return apiRequest<{ message: string }>(`/users/unblock/${blockedId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  update: async (
    id: string,
    formData: FormData,
    token: string
  ): Promise<UserResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${id}`,
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

  getFriends: async (
    status: FriendStatus,
    token: string,
    options?: GetFriendsOptions
  ) => {
    const query = options ? `?limit=${options.limit}&page=${options.page}` : "";

    return apiRequest<FriendsResponse>(`/friends/${status}${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  countFriends: async (status: FriendStatus, token: string) => {
    return apiRequest<number>(`/friends/count/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getFriendRequests: async (token: string, options: GetFriendsOptions) => {
    const query = options ? `?limit=${options.limit}&page=${options.page}` : "";

    return apiRequest<FriendsResponse>(`/friends/requests${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSuggestedFriends: async (token: string, options?: GetFriendsOptions) => {
    const query = options ? `?limit=${options.limit}&page=${options.page}` : "";

    return apiRequest<FriendsResponse>(`/friends/suggested${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  sendFriendRequest: async (token: string, userId: string) => {
    return apiRequest<Friend>("/friends/send", {
      method: "POST",
      body: JSON.stringify({ id: userId }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  cancelFriendRequest: async (token: string, userId: string) => {
    return apiRequest<Friend>(`/friends/cancel/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getFriend: async (friendId: string, token: string) => {
    return apiRequest<Friend>(`/friends/${friendId}/friend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  acceptFriendRequest: async (token: string, userId: string) => {
    return apiRequest<Friend>("/friends/accept", {
      method: "POST",
      body: JSON.stringify({ id: userId }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  declineFriendRequest: async (token: string, userId: string) => {
    return apiRequest<Friend>(`/friends/decline/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  removeFriend: async (friendId: string, token: string) => {
    return apiRequest<{ message: string }>(`/friends/remove/${friendId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  closeAccount: async (id: string, token: string) => {
    return apiRequest<{ message: string }>(`/users/remove/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  changePassword: async (
    data: Omit<ChangePasswordDto, "confirmPassword">,
    token: string
  ) => {
    return apiRequest<{ message: string }>("/users/change-password", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userService;
