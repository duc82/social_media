import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  Ref,
  forwardRef,
} from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: React.ReactNode;
  error?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  wrapperClassName?: string;
}

export default forwardRef(function InputGroup(
  { text, error, labelProps, wrapperClassName, ...inputProps }: InputGroupProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div
      className={wrapperClassName ? wrapperClassName : "mb-3 input-group-lg"}
    >
      <label htmlFor={inputProps.id} hidden {...labelProps}></label>
      <input type="text" className="form-control" {...inputProps} ref={ref} />
      {error ? (
        <div className="form-text text-danger mt-1">
          <ExclamationCircleFill size={16} className="me-2" />
          <span>{error}</span>
        </div>
      ) : (
        text
      )}
    </div>
  );
});
