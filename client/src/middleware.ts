import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/signin", // when user is not signed in
    error: "/signin",
    signOut: "/signout",
  },
});

export const config = {
  matcher: [
    // Match all route exclude /signup and /signin
    "/((?!signin|signup).*)",
  ],
};
