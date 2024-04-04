import { z } from "zod";

// regex one uppercase, one lowercase, one number, one special character, 8 characters minimum
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

export const signUpSchema = z
  .object({
    fullName: z
      .string({
        required_error: "Full name is required"
      })
      .min(2, "Full name must be at least 2 characters long"),
    email: z
      .string({
        required_error: "Email is required"
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required"
      })
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long"
      ),
    confirmPassword: z.string({
      required_error: "Passwords do not match"
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required"
    })
    .email("Invalid email address"),
  password: z.string({ required_error: "Password is required" }),
  isRemember: z.boolean().default(true)
});

export const forgotPasswordSchema = signInSchema.pick({ email: true });

export const resetPasswordSchema = signInSchema.pick({ password: true });
