import { SignInResponse, SignUpResponse } from "../types/auth";
import { FullUser } from "../types/user";
import { SignInDto, SignUpDto } from "../utils/validation";
import apiRequest from "./api";

const signUp = async (signUpDto: SignUpDto): Promise<SignUpResponse> => {
  return apiRequest<SignUpResponse>("/auth/signup", "POST", signUpDto);
};

const signIn = async (signInDto: SignInDto): Promise<SignInResponse> => {
  return apiRequest<SignInResponse>("/auth/signin", "POST", signInDto);
};

const getProfile = async (accessToken?: string): Promise<FullUser> => {
  return apiRequest<FullUser>("/auth/profile", "GET", null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export { signUp, signIn, getProfile };
