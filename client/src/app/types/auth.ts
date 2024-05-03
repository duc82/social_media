import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema
} from "../schemas/auth";
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
  extends Omit<z.infer<typeof signUpSchema>, "confirmPassword"> {
  avatar: string;
}

interface SignInDto extends z.infer<typeof signInSchema> {}

interface ForgotPasswordDto extends z.infer<typeof forgotPasswordSchema> {}

interface ResetPasswordDto extends z.infer<typeof resetPasswordSchema> {}

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
  ForgotPasswordDto,
  ResetPasswordDto
};
