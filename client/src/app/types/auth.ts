import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../schemas/auth";
import { FullUser, Gender } from "./user";
import { z } from "zod";

export interface SignUpResponse {
  user: FullUser;
  message: string;
}

export interface SignInResponse {
  token: string;
  user: FullUser;
  tokenExpiration: number;
  message: string;
}

export interface SignUpDto
  extends Omit<z.infer<typeof signUpSchema>, "confirmPassword"> {
  gender: Gender;
  birthday: string;
}

export interface SignInDto extends z.infer<typeof signInSchema> {}

export interface ForgotPasswordDto
  extends z.infer<typeof forgotPasswordSchema> {}

export interface ResetPasswordDto extends z.infer<typeof resetPasswordSchema> {}
