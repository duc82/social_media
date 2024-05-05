import { Options } from "../types";
import type {
  FriendsResponse,
  Friendship,
  FriendshipStatus,
  FullUser,
  UsersReponse,
} from "../types/user";
import apiRequest from "./api";

interface GetFriendsOptions extends Omit<Options, "userId"> {}

const userService = {
  getAll: async (options?: Options) => {
    const { page = 1, limit = 10, search = "" } = options || {};
    return apiRequest<UsersReponse>(
      `/users?search=${search}&page=${page}&limit=${limit}`,
      "GET"
    );
  },

  getUserProfile: async (id: string) => {
    return apiRequest<FullUser>(`/users/${id}/profile`, "GET");
  },

  getFriends: async (
    userId: string,
    status: FriendshipStatus,
    options?: GetFriendsOptions
  ) => {
    const { page = 1, limit = 10 } = options || {};
    return apiRequest<FriendsResponse>(
      `/users/${userId}/friends/${status}?page=${page}&limit=${limit}`,
      "GET"
    );
  },

  sendFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>("/users/friends/send", "POST", {
      body: JSON.stringify({ id: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  cancelFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>(`/users/friends/cancel/${userId}`, "DELETE", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getFriendship: async (accessToken: string, friendId: string) => {
    return apiRequest<Friendship>(
      `/users/friends/${friendId}/friendship`,
      "GET",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  acceptFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>("/users/friends/accept", "POST", {
      body: JSON.stringify({ id: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  declineFriendRequest: async (accessToken: string, userId: string) => {
    return apiRequest<Friendship>(`/users/friends/decline/${userId}`, "PUT", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default userService;
