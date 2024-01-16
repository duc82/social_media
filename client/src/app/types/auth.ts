import { FullUser } from "./user";

interface SignUpResponse {
  user: FullUser;
  message: string;
}

interface SignInResponse extends SignUpResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface RefreshResponse
  extends Pick<SignInResponse, "accessToken" | "message" | "expiresIn"> {}

export type { SignUpResponse, SignInResponse, RefreshResponse };
