import { FullUser } from "./user";

interface SignUpResponse {
  user: FullUser;
  message: string;
}

interface SignInResponse extends SignUpResponse {
  accessToken: string;
  refreshToken: string;
}

export type { SignUpResponse, SignInResponse };
