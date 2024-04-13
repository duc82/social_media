"use client";

import { usePathname } from "next/navigation";
import ForgotPasswordDecoration from "./ForgotPasswordDecoration";
import LoginDecoration from "./LoginDecoration";

export default function AuthDecoration() {
  const pathname = usePathname();

  if (pathname === "/forgotPassword" || pathname === "/resetPassword") {
    return <ForgotPasswordDecoration />;
  }

  return <LoginDecoration />;
}
