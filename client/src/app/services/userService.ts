import { Options } from "../types";
import type {
  FriendsResponse,
  Friend,
  FriendStatus,
  FullUser,
  UsersReponse,
  UserResponse,
} from "../types/user";
import apiRequest from "./api";

export interface GetFriendsOptions extends Omit<Options, "userId"> {}

const userService = {
  getAll: async (options?: Options) => {
    const query = options
      ? `?limit=${options.limit}&page=${options.page}&search=${options.search}`
      : "";
    return apiRequest<UsersReponse>(`/users${query}`);
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
};

export default userService;
