import { Options } from "../types";
import { FriendsResponse, FullUser, UsersReponse } from "../types/user";
import apiRequest from "./api";

interface GetFriendsOptions extends Omit<Options, "userId"> {
  status?: "pending" | "accepted" | "declined";
}

const userService = {
  getAll: async (options?: Options) => {
    const { page = 1, limit = 10, search = "" } = options || {};
    return apiRequest<UsersReponse>(
      `/users?search=${search}&page=${page}&limit=${limit}`,
      "GET"
    );
  },

  getFriends: async (userId: string, options?: GetFriendsOptions) => {
    const { page = 1, limit = 10 } = options || {};

    let url = `/users/friends?page=${page}&limit=${limit}&userId=${userId}`;

    if (options?.status) {
      url += `&status=${options.status}`;
    }

    return apiRequest<FriendsResponse>(url, "GET");
  },

  getUserProfile: async (id: string) => {
    return apiRequest<FullUser>(`/users/${id}/profile`, "GET");
  },
};

export default userService;
