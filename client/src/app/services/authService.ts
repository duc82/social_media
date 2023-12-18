import { SignUpDto, UserResponse } from "../types/auth";
import apiRequest from "./api";

const signUp = async (signUpDto: SignUpDto): Promise<UserResponse> => {
  return apiRequest<UserResponse>("/auth/signup", "POST", signUpDto);
};

export { signUp };
