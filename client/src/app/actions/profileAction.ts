"use server";
import { notFound } from "next/navigation";
import { FullUser } from "../types/user";
import userService from "../services/userService";

export const getProfileById = async (
  id: string | undefined,
  currentUser: FullUser
) => {
  if (!id) {
    return currentUser;
  }

  if (currentUser.id === id) {
    return currentUser;
  }

  try {
    const user = await userService.getUserProfile(id);
    return user;
  } catch (error) {
    notFound();
  }
};
