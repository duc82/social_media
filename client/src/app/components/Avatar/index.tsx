import Image from "next/image";
import clsx from "clsx";
import { CSSProperties, HTMLProps } from "react";

interface AvatarProps extends HTMLProps<HTMLImageElement> {
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
  ...props
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
