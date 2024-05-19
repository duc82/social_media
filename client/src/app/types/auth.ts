import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../schemas/auth";
import { FullUser, Gender } from "./user";
import { z } from "zod";

interface SignUpResponse {
  user: FullUser;
  message: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken?: string;
  user: FullUser;
  accessTokenExpired: number;
}

interface SignUpDto
  extends Omit<z.infer<typeof signUpSchema>, "confirmPassword"> {
  avatar: string;
  gender: Gender;
  birthday: string;
}

interface SignInDto extends z.infer<typeof signInSchema> {}

interface ForgotPasswordDto extends z.infer<typeof forgotPasswordSchema> {}

interface ResetPasswordDto extends z.infer<typeof resetPasswordSchema> {}

interface RefreshResponse {
  message: string;
  accessToken: string;
  accessTokenExpired: number;
}

export type {
  SignUpResponse,
  SignInResponse,
  RefreshResponse,
  SignInDto,
  SignUpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
};
