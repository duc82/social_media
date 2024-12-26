import { Options } from "../types";
import { Group, GroupResponse, GroupsResponse } from "../types/group";
import apiRequest from "./api";

const groupService = {
  getAll: async (token: string, options?: Options) => {
    const { limit = 20, page = 1, search = "" } = options || {};

    const query = `?limit=${limit}&page=${page}&search=${search}`;

    return apiRequest<GroupsResponse>(`/groups${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  create: async (formData: FormData, token: string) => {
    return apiRequest<GroupResponse>("/groups/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      isFormData: true,
      body: formData,
    });
  },

  getById: async (id: string, token: string) => {
    return apiRequest<Group>(`/groups/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default groupService;
