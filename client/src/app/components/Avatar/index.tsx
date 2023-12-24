import Image from "next/image";
import clsx from "clsx";

interface AvatarProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  wrapperClassName?: string;
  className?: string;
}

export default function Avatar({
  src,
  alt,
  width = "100%",
  height = "100%",
  wrapperClassName,
  className,
}: AvatarProps) {
  return (
    <div
      className={clsx("position-relative", wrapperClassName)}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={alt ?? "Avatar"}
        fill
        className={clsx("rounded", className)}
      />
    </div>
  );
}
