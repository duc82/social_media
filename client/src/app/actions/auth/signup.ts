"use server";

import db from "@/app/configs/db";
import { users } from "@/app/schema";
import bcrypt from "bcryptjs";

const signUp = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const keepSignedIn = formData.get("keepSignedIn") as string;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await db.insert(users).values({
      name,
      email,
      password: passwordHash,
      keepSignedIn: JSON.parse(keepSignedIn),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Signup failed");
  }
};

export { signUp };
