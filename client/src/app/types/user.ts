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
  location: string | null;
}

interface User {
  fullName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  profile: Profile;
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

export type { User, FullUser, UsersReponse, FriendsResponse };
