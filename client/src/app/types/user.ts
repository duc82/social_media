type FriendshipStatus = "pending" | "accepted" | "declined";

type Role = "user" | "admin";

interface Profile {
  id: string;
  gender: "male" | "female" | "other" | null;
  avatar: string;
  wallpaper: string | null;
  bornAt: string | null;
  maritalStatus: "single" | "married" | "divorced" | "widowed" | null;
  job: string | null;
  address: string | null;
  overview: string | null;
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
