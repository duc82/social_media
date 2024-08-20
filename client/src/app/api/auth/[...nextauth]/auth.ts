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

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...token, ...user };
      }

      if (Date.now() >= token.tokenExpiration) {
        token = { ...token, token: "" };
      }

      if (trigger === "update") {
        token = { ...token, ...session.user };
      }

      return token;
    },
    session({ session, token }) {
      session.token = token.token;
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email!,
        lastName: token.lastName,
        firstName: token.firstName,
        username: token.username,
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
