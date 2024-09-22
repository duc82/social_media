import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  username: z.string().min(2).max(255),
  birthday: z.string(),
  bio: z.string().optional().nullable(),
});
