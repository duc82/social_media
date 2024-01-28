import { signInSchema, signUpSchema } from "../schemas/auth";
import { FullUser } from "./user";
import { z } from "zod";

interface SignUpResponse {
  user: FullUser;
  message: string;
}

interface SignInResponse extends SignUpResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface SignUpDto
  extends Omit<z.infer<typeof signUpSchema>, "confirmPassword"> {}

interface SignInDto extends z.infer<typeof signInSchema> {}

interface RefreshResponse
  extends Pick<SignInResponse, "accessToken" | "message" | "expiresIn"> {}

export type {
  SignUpResponse,
  SignInResponse,
  RefreshResponse,
  SignInDto,
  SignUpDto,
};
