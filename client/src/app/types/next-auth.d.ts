import { Session } from "inspector";
import NextAuth, { DefaultSession } from "next-auth";
import { FullUser } from "./user";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User extends FullUser {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }

  interface Session {
    user: Omit<User, "accessToken"> & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends FullUser {
    /** OpenID ID Token */
    accessToken: string;
    /** OpenID Refresh Token */
    refreshToken: string;
    /** OpenID Access Token Expiration Time */
    expiresIn: number;
  }
}
