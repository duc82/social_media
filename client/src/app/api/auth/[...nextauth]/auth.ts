import authService from "@/app/services/authService";
import { SignInDto } from "@/app/types/auth";
import { FullUser } from "@/app/types/user";
import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials) {
          const data = await authService.signIn(credentials as SignInDto);
          return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            ...data.user,
          };
        }

        throw new Error("Login failed");
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name;
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
        token.createdAt = user.createdAt;
        token.profile = user.profile;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email as string;
      session.user.fullName = token.fullName;
      session.user.role = token.role;
      session.user.createdAt = token.createdAt;
      session.user.profile = token.profile;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signout",
    newUser: "/",
  },

  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },

  debug: process.env.NODE_ENV === "development",
});

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User extends FullUser {
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: FullUser & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends FullUser {
    /** OpenID ID Token */
    accessToken: string;
    /** OpenID Refresh Token */
    refreshToken: string;
  }
}
