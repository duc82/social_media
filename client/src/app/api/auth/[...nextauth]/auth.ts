import authService from "@/app/services/authService";
import { SignInDto } from "@/app/types/auth";
import { FullUser } from "@/app/types/user";
import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JwtPayload, jwtDecode } from "jwt-decode";
import "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter email"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password"
        }
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const data = await authService.signIn(credentials as SignInDto);
            return {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              ...data.user
            };
          } catch (error) {
            const newError = new CredentialsSignin();
            newError.code = (error as Error).message;
            throw newError;
          }
        }

        throw new CredentialsSignin("Invalid credentials");
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
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

      const decoded = jwtDecode<JwtPayload>(token.accessToken);

      if (!decoded.exp) {
        throw new Error("Access token is invalid");
      }

      if (decoded.exp * 1000 <= Date.now()) {
        try {
          const data = await authService.refresh(token.refreshToken);
          token.accessToken = data.accessToken;
          console.log("refresh");

          return { ...token, accessToken: data.accessToken };
        } catch (error) {
          throw new Error("Access token is invalid");
        }
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
    }
  },

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signout",
    newUser: "/"
  },

  debug: process.env.NODE_ENV === "development"
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

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends FullUser {
    /** OpenID ID Token */
    accessToken: string;
    /** OpenID Refresh Token */
    refreshToken: string;
  }
}
