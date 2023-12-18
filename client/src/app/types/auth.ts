import { FullUser } from "./user";

interface SignUpDto {
  fullName: string;
  email: string;
  password: string;
}

interface UserResponse {
  user: FullUser;
  message: string;
}

export type { SignUpDto, UserResponse };
