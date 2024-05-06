import authService from "@/app/services/authService";
import { SignInDto } from "@/app/types/auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

class SignInError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
        isRemember: {
          label: "Remember me",
          type: "checkbox",
        },
      },
      async authorize(credentials) {
        try {
          const data = {
            email: credentials.email,
            password: credentials.password,
            isRemember: credentials.isRemember,
          } as SignInDto;

          const result = await authService.signIn(data);

          return { ...result, ...result.user };
        } catch (error) {
          if (error instanceof Error) {
            throw new SignInError(error.message);
          }

          throw new SignInError("Invalid credentials");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      if (token.accessTokenExpired <= Date.now()) {
        if (!token.refreshToken) {
          await signOut();
          throw new Error("Refresh token is missing");
        }

        try {
          const data = await authService.refreshToken(token.refreshToken);
          token.accessToken = data.accessToken;
          token.accessTokenExpired = data.accessTokenExpired;
        } catch (error) {
          await signOut();
          throw error;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email!,
        fullName: token.fullName,
        role: token.role,
        profile: token.profile,
        emailVerified: token.emailVerified,
        createdAt: token.createdAt,
      };

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
    newUser: "/",
    verifyRequest: "/verify",
  },

  debug: process.env.NODE_ENV === "development",
});
