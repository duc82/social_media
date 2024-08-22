import { ButtonProps } from "@/app/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ButtonBack(props: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="btn btn-light rounded-circle d-flex align-items-center justify-content-center text-body"
      style={{ width: 36, height: 36 }}
    >
      <FontAwesomeIcon icon={faArrowLeft} fontSize={18} fill="currentColor" />
    </button>
  );
}
