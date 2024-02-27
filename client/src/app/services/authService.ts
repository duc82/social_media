import {
  RefreshResponse,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
} from "../types/auth";
import { FullUser } from "../types/user";
import apiRequest from "./api";

const authService = {
  signUp: async (signUpDto: SignUpDto): Promise<SignUpResponse> => {
    return apiRequest<SignUpResponse>("/auth/signup", "POST", {
      body: JSON.stringify(signUpDto),
    });
  },
  signIn: async (signInDto: SignInDto): Promise<SignInResponse> => {
    return apiRequest<SignInResponse>("/auth/signin", "POST", {
      body: JSON.stringify(signInDto),
    });
  },
  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    return apiRequest<RefreshResponse>("/auth/refresh", "POST", {
      body: JSON.stringify({ refreshToken }),
    });
  },
  getProfile: async (accessToken?: string): Promise<FullUser> => {
    return apiRequest<FullUser>("/auth/profile", "GET", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default authService;
