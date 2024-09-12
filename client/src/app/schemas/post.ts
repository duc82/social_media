import { z } from "zod";

export const POST_ACCESS = ["Public", "Friends", "Only me"] as const;

export const postSchema = z.object({
  content: z.string().optional(),
  access: z.enum(POST_ACCESS).default("Public"),
  feeling: z.array(z.string()).optional(),
  activity: z.array(z.string()).optional(),
});
