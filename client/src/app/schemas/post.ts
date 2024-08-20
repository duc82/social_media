import { z } from "zod";

export const postSchema = z.object({
  content: z.string().optional(),
  access: z.enum(["public", "friends", "private"]).default("public"),
});
