type FriendStatus = "pending" | "accepted" | "declined";

type Role = "user" | "admin";

export type Gender = "male" | "female" | "other";

type MarialStatus = "single" | "married" | "divorced" | "widowed" | null;

interface Profile {
  id: string;
  gender: Gender;
  avatar: string;
  wallpaper: string | null;
  birthday: string;
  maritalStatus: MarialStatus;
  job: string | null;
  address: string | null;
  bio: string | null;
  education: string | null;
  workplace: string | null;
}

interface User {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  profile: Profile;
  emailVerified: Date | null;
}

interface FullUser extends User {
  id: string;
  banAt: string | null;
  deleteAt: string | null;
  createdAt: string;
}

interface UsersReponse {
  users: FullUser[];
  total: number;
  page: number;
  limit: number;
}

interface FriendsResponse {
  friends: FullUser[];
  total: number;
  page: number;
  limit: number;
}

interface Friend {
  id: string;
  status: FriendStatus;
  user: FullUser;
  friend: FullUser;
}

export type {
  User,
  FullUser,
  UsersReponse,
  FriendsResponse,
  FriendStatus,
  Friend,
  Role,
};
