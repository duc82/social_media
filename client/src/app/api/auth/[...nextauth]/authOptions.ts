import authService from "@/app/services/authService";
import { SignInDto } from "@/app/types/auth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials) {
          const data = await authService.signIn(credentials as SignInDto);
          return { ...data, ...data.user };
        }

        throw new Error("Login failed");
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.email = user.email;
        token.profile = user.profile;
        token.createdAt = user.createdAt;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.fullName = token.fullName;
      session.user.email = token.email;
      session.user.profile = token.profile;
      session.user.createdAt = token.createdAt;
      session.accessToken = token.accessToken;

      const decoded = jwtDecode<JwtPayload>(session.accessToken);

      if (!decoded.exp) {
        throw new Error("Token has no expiration date");
      }

      if (Date.now() >= decoded.exp * 1000) {
        try {
          const data = await authService.refresh(token.refreshToken);
          session.accessToken = data.accessToken;
        } catch (error) {
          throw new Error("Failed to refresh token");
        }
      }

      return session;
    }
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signout",
    newUser: "/"
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development"
};
