import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().min(2).max(255).optional().nullable(),
  lastName: z.string().min(2).max(255).optional().nullable(),
  username: z.string().min(2).max(255).optional().nullable(),
  birthday: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});
