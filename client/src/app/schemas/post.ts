import { z } from "zod";

export const POST_ACCESS = ["public", "friends", "only me"] as const;

export const postSchema = z.object({
  content: z.string().optional(),
  access: z.enum(POST_ACCESS).default("public"),
  feeling: z.array(z.string()).optional(),
  activity: z.array(z.string()).optional(),
});
