import { signIn } from "@/app/services/authService";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET must be defined in .env");
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullName: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const { user, accessToken } = await signIn(credentials);

            return { ...user, accessToken };
          } catch (error) {
            throw error;
          }
        }

        throw new Error("Credentials not provided");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.email = user.email;
        token.createdAt = user.createdAt;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.fullName = token.fullName;
      session.user.email = token.email;
      session.user.createdAt = token.createdAt;
      session.accessToken = token.accessToken;

      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signout",
  },

  secret,

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
