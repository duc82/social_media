interface User {
  fullName: string;
  email: string;
  password: string;
  keepSignedIn: boolean;
}

interface FullUser extends User {
  id: string;
  createdAt: string;
}

export type { User, FullUser };
