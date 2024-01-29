import authService from "@/app/services/authService";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          const data = await authService.signIn(credentials);
          console.log({ data });
          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expired: data.expiresIn,
          };
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
        token.profile = user.profile;
        token.createdAt = user.createdAt;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expired = user.expired;
      }

      console.log(token.expired);

      if (Date.now() > token.expired) {
        try {
          const data = await authService.refresh(user.refreshToken);
          token.accessToken = data.accessToken;
          token.expired = data.expiresIn;
        } catch (error) {
          window.location.href = "/signin";
        }
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
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signout",
    newUser: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
