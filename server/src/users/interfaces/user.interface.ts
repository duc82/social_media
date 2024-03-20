export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface UserPayload {
  userId: string;
  role: Role;
}
