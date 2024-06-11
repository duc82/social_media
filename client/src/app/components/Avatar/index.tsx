import Image from "next/image";
import clsx from "clsx";

interface AvatarProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  wrapperClassName?: string;
  className?: string;
  sizes?: string;
}

export default function Avatar({
  src,
  alt,
  width,
  height,
  wrapperClassName,
  className,
  sizes = "100%"
}: AvatarProps) {
  return (
    <div className={clsx("avatar", wrapperClassName)} style={{ width, height }}>
      <Image
        src={src}
        alt={alt ?? "Avatar"}
        fill
        sizes={sizes}
        className={clsx("avatar-img rounded", className)}
      />
    </div>
  );
}
