"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    signOut({
      callbackUrl: "/signin",
    });
  }, []);

  return null;
}
