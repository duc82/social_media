import { signInSchema, signUpSchema } from "../schemas/auth";
import { FullUser } from "./user";
import { z } from "zod";

interface SignUpResponse {
  user: FullUser;
  message: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: FullUser;
}

interface SignUpDto
  extends Omit<z.infer<typeof signUpSchema>, "confirmPassword"> {}

interface SignInDto extends z.infer<typeof signInSchema> {}

interface RefreshResponse {
  message: string;
  accessToken: string;
}

export type {
  SignUpResponse,
  SignInResponse,
  RefreshResponse,
  SignInDto,
  SignUpDto,
};
