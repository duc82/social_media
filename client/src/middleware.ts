import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

const validateAuthToken = (token: string) => {
  const payload = jwt.decode(token) as JwtPayload | null;

  const exp = (payload?.exp ?? 0) * 1000;

  if (Date.now() >= exp) {
    return false;
  }

  return true;
};

// Redirect to the sign in page if the user is not authenticated
export default auth(async (req) => {
  const url = req.nextUrl;

  if (!req.auth) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  const valid = validateAuthToken(req.auth.token);

  if (!valid) {
    url.pathname = "/signout";
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
     * - privacy-terms (privacy terms page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signout|signup|forgotPassword|resetPassword|verify|ringing-call|privacy-terms).*)",
  ],
};
