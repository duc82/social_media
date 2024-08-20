import { Options } from "../types";
import type {
  FriendsResponse,
  Friend,
  FriendStatus,
  FullUser,
  UsersReponse,
  UserResponse,
  UpdateUserProfileDto,
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

  updateUserProfile: async (data: UpdateUserProfileDto, token: string) => {
    return apiRequest<UserResponse>("/users/profile/update", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
