import { SignUpDto } from "../types/auth";
import { FullUser } from "../types/user";
import apiRequest from "./api";

const signUp = async (signUpDto: SignUpDto): Promise<FullUser> => {
  console.log("signup");
  return apiRequest<FullUser>("/auth/signup", "POST", signUpDto);
};

export { signUp };
