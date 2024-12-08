import { z } from "zod";

export const GROUP_ACCESS = ["public", "private"] as const;

export const createGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  access: z.enum(GROUP_ACCESS).default("public"),
  description: z.string().optional(),
});
