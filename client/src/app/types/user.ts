interface User {
  fullName: string;
  email: string;
  password: string;
}

interface FullUser extends User {
  id: string;
  createdAt: string;
}

export type { User, FullUser };
