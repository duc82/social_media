import { z } from "zod";
import { FullUser } from "./user";
import { createGroupSchema } from "../schemas/group";

export interface GroupMember {
  id: string;
  user: FullUser;
  role: "admin" | "moderator" | "member";
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  picture: string;
  wallpaper: string;
  access: "public" | "private";
  members: GroupMember[];
  totalMembers: number;
  deletedAt: string;
  createdAt: string;
}

export type CreateGroupDto = z.infer<typeof createGroupSchema>;

export interface GroupResponse {
  group: Group;
  message: string;
}

export interface GroupsResponse {
  groups: Group[];
  page: number;
  limit: number;
  total: number;
}
