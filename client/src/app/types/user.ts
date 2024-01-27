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

export type { User, FullUser };
