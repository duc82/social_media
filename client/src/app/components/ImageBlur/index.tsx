"use server";
import { getImageBase64 } from "@/app/libs/plaiceholder";
import Image, { ImageProps } from "next/image";

interface ImageBlurProps
  extends Omit<ImageProps, "blurDataURL" | "placeholder"> {}

export default async function ImageBlur(props: ImageBlurProps) {
  const blurDataURL = await getImageBase64(props.src as string);

  return <Image {...props} placeholder="blur" blurDataURL={blurDataURL} />;
}
