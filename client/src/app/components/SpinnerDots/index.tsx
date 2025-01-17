import clsx from "clsx";
import "./SpinnerDots.scss";

interface SpinnerDotsProps {
  className?: string;
}

export default function SpinnerDots(props: SpinnerDotsProps) {
  return (
    <div className={clsx("spinner-dots", props.className)}>
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className="spinner-dot"
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        ></span>
      ))}
    </div>
  );
}
