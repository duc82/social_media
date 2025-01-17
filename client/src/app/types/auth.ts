import {
  changePasswordDto,
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

export interface SignUpDto extends z.infer<typeof signUpSchema> {
  gender: Gender;
  birthday: string;
}

export type SignInDto = z.infer<typeof signInSchema>;

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export type ChangePasswordDto = z.infer<typeof changePasswordDto>;
