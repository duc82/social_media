import { z } from "zod";

export const postSchema = z.object({
  content: z.string().optional(),
  audience: z.enum(["public", "friends", "private"]).default("public"),
});
