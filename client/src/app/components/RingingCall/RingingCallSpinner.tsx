import clsx from "clsx";
import Spinner from "../Spinner";

export default function RingingCallSpinner({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <div
      className={clsx(
        "d-flex align-items-center justify-content-center vh-100 bg-black text-white",
        isLoading ? "d-block" : "d-none"
      )}
    >
      <Spinner />
    </div>
  );
}
