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
    fullName: z
      .string({
        required_error: "Full name is required",
      })
      .min(2, "Full name must be at least 2 characters long"),
    email,
    password,
    confirmPassword: z.string({
      required_error: "Passwords do not match",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email,
  password: z.string().min(8, "Password must be at least 8 characters long"),
  isRemember: z.boolean().default(true),
});

export const forgotPasswordSchema = z.object({
  email,
});

export const resetPasswordSchema = z.object({
  password,
});
