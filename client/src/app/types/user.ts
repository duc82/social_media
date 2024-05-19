type FriendshipStatus = "pending" | "accepted" | "declined";

type Role = "user" | "admin";

export type Gender = "male" | "female" | "other";

interface Profile {
  id: string;
  gender: Gender;
  avatar: string;
  wallpaper: string | null;
  birthday: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed" | null;
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

interface Friendship {
  id: string;
  status: FriendshipStatus;
  user: FullUser;
  friend: FullUser;
}

export type {
  User,
  FullUser,
  UsersReponse,
  FriendsResponse,
  FriendshipStatus,
  Friendship,
  Role,
};
