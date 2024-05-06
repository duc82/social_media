import "next-auth/jwt";
import type { FullUser, Role } from "./user";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends FullUser {
    accessToken: string;
    refreshToken?: string;
    accessTokenExpired: number;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    user: FullUser;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends FullUser {
    accessToken: string;
    refreshToken?: string;
    /** Access token expired (miliseconds) */
    accessTokenExpired: number;
  }
}
