"use server";
import {
  revalidatePath as revalidatePathCustom,
  revalidateTag as revalidateTagCustom,
} from "next/cache";

export const revalidatePath = async (
  originalPath: string,
  type?: "page" | "layout" | undefined
) => {
  revalidatePathCustom(originalPath, type);
};

export const revalidateTag = async (tag: string) => {
  revalidateTagCustom(tag);
};
