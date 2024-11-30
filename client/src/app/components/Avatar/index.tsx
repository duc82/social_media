import Image from "next/image";
import clsx from "clsx";
import { CSSProperties } from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  style?: CSSProperties;
}

export default function Avatar({
  src,
  alt,
  className,
  fill = true,
  width,
  height,
  style,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt || "Avatar"}
      fill={fill}
      sizes={sizes}
      width={width}
      height={height}
      style={style}
      className={clsx("avatar-img rounded", className)}
    />
  );
}
