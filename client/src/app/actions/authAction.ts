"use server";
import { signOut } from "../api/auth/[...nextauth]/auth";

export const signOutServer = async () => {
  await signOut({
    redirectTo: "/signin",
  });
};
