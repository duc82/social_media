import { RefreshResponse, SignInResponse, SignUpResponse } from "../types/auth";
import { FullUser } from "../types/user";
import { SignInDto, SignUpDto } from "../utils/validation";
import apiRequest from "./api";

const authService = {
  signUp: async (signUpDto: SignUpDto): Promise<SignUpResponse> => {
    return apiRequest<SignUpResponse>("/auth/signup", "POST", signUpDto);
  },
  signIn: async (signInDto: SignInDto): Promise<SignInResponse> => {
    return apiRequest<SignInResponse>("/auth/signin", "POST", signInDto);
  },
  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    return apiRequest<RefreshResponse>("/auth/refresh", "POST", {
      refreshToken,
    });
  },
  getProfile: async (accessToken?: string): Promise<FullUser> => {
    return apiRequest<FullUser>("/auth/profile", "GET", null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default authService;
