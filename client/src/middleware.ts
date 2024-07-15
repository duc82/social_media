import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/auth";

// Redirect to the sign in page if the user is not authenticated
export default auth((req) => {
  if (!req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - signin (sign in page)
     * - signup (sign up page)
     * - forgotPassword (forgot password page)
     * - resetPassword (reset password page)
     * - verify (verify email page)
     * - ringing-call (ringing call page)
     * - admin (admin page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|forgotPassword|resetPassword|verify|ringing-call|admin).*)",
  ],
};
