/* eslint-disable no-unused-vars */
import "next-auth/jwt";
import type { FullUser } from "./user";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends FullUser {
    token: string;
  }

  interface Session extends DefaultSession {
    token: string;
    user: FullUser;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends FullUser {
    token: string;
    user: FullUser;
  }
}
