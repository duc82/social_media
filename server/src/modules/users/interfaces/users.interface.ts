import { UserRole } from "../enums/users.enum";

export interface UserPayload {
  userId: string;
  role: UserRole;
}
