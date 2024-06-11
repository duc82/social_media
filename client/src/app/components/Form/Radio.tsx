import clsx from "clsx";
import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  wrapperClassName?: string;
  text: string;
}

export default forwardRef(function Radio(
  { error, text, wrapperClassName, ...inputProps }: RadioProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <label
      htmlFor={inputProps.id}
      className={clsx(
        "w-100 rounded-2 bg-body py-2 ps-3 d-flex align-items-center border",
        wrapperClassName
      )}
    >
      <input
        type="radio"
        className="form-check-input m-0 me-2"
        {...inputProps}
        ref={ref}
      />
      <span className="text-light-emphasis">{text}</span>
    </label>
  );
});
