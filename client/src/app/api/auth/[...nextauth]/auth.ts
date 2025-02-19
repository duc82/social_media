import authService from "@/app/services/authService";
import { SignInDto } from "@/app/types/auth";
import { FullUser } from "@/app/types/user";
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

          return { ...result.user, token: result.token };
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

      if (trigger === "update") {
        token = { ...token, ...session.user };
      }

      return token;
    },

    // Don't touch this
    session({ session, token }) {
      session.token = token.token;

      session.user = {
        ...token,
        name: token.fullName,
        image: token.profile.avatar,
        email: token.email as string,
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
});
