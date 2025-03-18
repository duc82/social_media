import { z } from "zod";

// regex one uppercase, one lowercase, one number, one special character, 8 characters minimum
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

const email = z.string().email("Invalid email address");

const password = z
  .string()
  .regex(
    passwordRegex,
    "Password must contain at least one uppercase, one lowercase, one number, one special character and 8 characters long"
  );

export const signUpSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .min(2, "First name must be at least 2 characters long"),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(2, "Last name must be at least 2 characters long"),
    email,
    password,
    confirmPassword: z.string(),
    birthday: z.string(),
    dateOfBirth: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    gender: z.enum(["male", "female", "other"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email,
  password: z.string().min(8, "Password must be at least 8 characters long"),
  isRemember: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email,
});

export const resetPasswordSchema = z.object({
  password,
});

export const changePasswordDto = z
  .object({
    currentPassword: password,
    newPassword: password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
