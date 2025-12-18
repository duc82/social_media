import { z } from "zod";
import { userProfileSchema } from "../schemas/user";
import { Story } from "./story";

export type FriendStatus = "pending" | "accepted" | "declined";

export type Role = "user" | "admin";

export const GENDER = ["male", "female", "other"] as const;

export const MARIAL_STATUS = [
  "single",
  "married",
  "divorced",
  "widowed",
] as const;

export type Gender = (typeof GENDER)[number];

export type MarialStatus = (typeof MARIAL_STATUS)[number];

export interface Profile {
  id: string;
  gender: Gender;
  avatar: string;
  wallpaper: string | null;
  birthday: string;
  maritalStatus: MarialStatus | null;
  job: string | null;
  address: string | null;
  bio: string | null;
  education: string | null;
  workplace: string | null;
}

export interface User {
  username: string;
  lastName: string;
  firstName: string;
  fullName: string;
  email: string;
  role: Role;
  profile: Profile;
  stories: Story[];
  emailVerified: Date | null;
  offlineAt: string | null;
}

export interface Blocked {
  id: string;
  user: FullUser;
  blockedBy: FullUser;
}

export interface FullUser extends User {
  id: string;
  bannedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
}

export interface UserResponse {
  user: FullUser;
  message: string;
}

export interface UsersReponse {
  users: FullUser[];
  total: number;
  page: number;
  limit: number;
}

export interface BlockedsResponse {
  blocked: Blocked[];
  total: number;
  page: number;
  limit: number;
}

export interface BlockedResponse {
  blocked: Blocked;
  message: string;
}

export interface FriendsResponse {
  friends: FullUser[];
  total: number;
  page: number;
  limit: number;
}

export interface Friend {
  id: string;
  status: FriendStatus;
  user: FullUser;
  friend: FullUser;
}

export type UpdateUserDto = z.infer<typeof userProfileSchema>;
