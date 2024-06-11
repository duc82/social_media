import { Options } from "../types";
import type {
  FriendsResponse,
  Friendship,
  FriendshipStatus,
  FullUser,
  UsersReponse
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

  getUserProfile: async (id: string) => {
    return apiRequest<FullUser>(`/users/${id}/profile`);
  },

  getCurrent: async (accessToken: string) => {
    return apiRequest<FullUser>("/users/current", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  getFriends: async (
    accessToken: string,
    status: FriendshipStatus,
    options?: GetFriendsOptions
  ) => {
    const query = options ? `?limit=${options.limit}&page=${options.page}` : "";

    return apiRequest<FriendsResponse>(`/users/friends/${status}${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  getFriendRequests: async (
    accessToken: string,
    options: GetFriendsOptions
  ) => {
    const query = options ? `?limit=${options.limit}&page=${options.page}` : "";

    return apiRequest<FriendsResponse>(`/users/friends/requests${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  getSuggestedFriends: async (
    accessToken: string,
    options?: GetFriendsOptions
  ) => {
    const query = options ? `?limit=${options.limit}&page=${options.page}` : "";

    return apiRequest<FriendsResponse>(`/users/friends/suggested${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  sendFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>("/users/friends/send", {
      method: "POST",
      body: JSON.stringify({ id: userId }),
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  cancelFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>(`/users/friends/cancel/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  getFriendship: async (accessToken: string, friendId: string) => {
    return apiRequest<Friendship>(`/users/friends/${friendId}/friendship`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  acceptFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>("/users/friends/accept", {
      method: "POST",
      body: JSON.stringify({ id: userId }),
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },

  declineFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>(`/users/friends/decline/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
};

export default userService;
