import {
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
} from "../types/auth";
import apiRequest from "./api";

const authService = {
  signUp: async (signUpDto: Omit<SignUpDto, "confirmPassword">) => {
    return apiRequest<SignUpResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(signUpDto),
    });
  },

  signIn: async (signInDto: SignInDto) => {
    return apiRequest<SignInResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(signInDto),
    });
  },

  verifyEmail: async (token: string) => {
    return apiRequest<{ message: string }>("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  forgotPassword: async (email: string) => {
    return apiRequest<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string) => {
    return apiRequest<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ password, token }),
    });
  },
};

export default authService;
