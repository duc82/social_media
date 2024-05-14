import { UserRole } from "src/interfaces/roles.interface";

export interface UserPayload {
  userId: string;
  role: UserRole;
}
