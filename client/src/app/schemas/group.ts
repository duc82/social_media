import { FilePreview } from "./../types/index";
import { z } from "zod";

export const GROUP_ACCESS = ["public", "private"] as const;

export const createGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  access: z.enum(GROUP_ACCESS).default("public"),
  pictureFile: z.custom<FilePreview>((data) => data, {
    message: "Picture is required",
  }),
  wallpaperFile: z.custom<FilePreview>((data) => data, {
    message: "Wallpaper is required",
  }),
  description: z.string().optional(),
});
