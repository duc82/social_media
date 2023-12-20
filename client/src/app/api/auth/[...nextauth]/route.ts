import { signIn } from "@/app/services/authService";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullName: { label: "Full Name", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const { user } = await signIn(credentials);
            return user;
          } catch (error) {
            return null;
          }
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log({ token, user, account, profile });
      return token;
    },

    async session({ session, user, token }) {
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },

  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
