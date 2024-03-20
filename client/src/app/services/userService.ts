import { UsersReponse } from "../types/user";
import apiRequest from "./api";

const userService = {
  getAll: async (accessToken: string, search: string, page = 1, limit = 10) => {
    return apiRequest<UsersReponse>(
      `/users?search=${search}&page=${page}&limit=${limit}`,
      "GET",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  getFriends: async (accessToken: string, page = 1, limit = 10) => {
    return apiRequest<UsersReponse>(
      `/users/friends?page=${page}&limit=${limit}`,
      "GET",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default userService;
