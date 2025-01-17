import Spinner from "../Spinner";

export default function RingingCallSpinner() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 text-white"
      style={{ backgroundColor: "rgb(20,20,20)" }}
    >
      <Spinner />
    </div>
  );
}
