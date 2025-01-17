"use client";
import usePasswordScore from "@/app/hooks/usePasswordScore";
import { changePasswordDto } from "@/app/schemas/auth";
import userService from "@/app/services/userService";
import { ChangePasswordDto } from "@/app/types/auth";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../Spinner";

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordDto>({
    resolver: zodResolver(changePasswordDto),
    mode: "onChange",
  });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const token = session?.token;

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const { pwdScore, pwdScoreClassName } = usePasswordScore(
    watch("newPassword")
  );

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = async (data: ChangePasswordDto) => {
    if (!token) return;
    try {
      const { confirmPassword: _, ...changePasswordDto } = data;

      const { message } = await userService.changePassword(
        changePasswordDto,
        token
      );
      setMessage(message);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Change password failed"
      );
      setMessage(null);
    }
  };

  return (
    <Fragment>
      {error && (
        <div
          className="alert mb-3 alert-danger d-flex align-items-center justify-content-between"
          role="alert"
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0"></i>
            <span>{error}</span>
          </div>
        </div>
      )}

      {message && (
        <div
          className="alert mb-3 alert-success d-flex align-items-center justify-content-between"
          role="alert"
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2 flex-shrink-0"></i>
            <span>{message}</span>
          </div>
        </div>
      )}

      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12">
          <label className="form-label" htmlFor="currentPassword">
            Current password
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <div className="form-text text-danger mt-1">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              <span>{errors.currentPassword.message}</span>
            </div>
          )}
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="newPassword">
            New password
          </label>
          <div className="input-group">
            <input
              className="form-control"
              type={passwordType}
              id="newPassword"
              placeholder="Enter new password"
              {...register("newPassword")}
            />
            <span
              id="passwordHelpBlock"
              className="input-group-text p-0 cursor-pointer"
              onClick={togglePasswordType}
            >
              <FontAwesomeIcon
                icon={passwordType === "password" ? faEyeSlash : faEye}
                className="w-40px"
              />
            </span>
          </div>
          <div className="mt-2 password-strength-meter">
            <div
              className={clsx(
                "password-strength-meter-score",
                pwdScoreClassName
              )}
            ></div>
          </div>
          <div className="d-flex mt-1">
            <div>
              {errors.newPassword && (
                <div className="form-text text-danger mt-1">
                  <i className="bi bi-exclamation-circle-fill me-2"></i>
                  <span>{errors.newPassword.message}</span>
                </div>
              )}
              {!errors.newPassword && pwdScore === 0 && (
                <span>Write your password...</span>
              )}
              {!errors.newPassword && pwdScore === 5 && (
                <span>Yeah! that password rocks :))</span>
              )}
            </div>
            <div className="ms-auto">
              <i
                className="bi bi-info-circle"
                data-bs-toggle="popover"
                data-bs-placement="top"
                data-bs-content="Include at least one uppercase, one lowercase, one special character, one number and 8 characters long."
              ></i>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="form-text text-danger mt-1">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              <span>{errors.confirmPassword.message}</span>
            </div>
          )}
        </div>
        <div className="col-12 text-end">
          <button
            type="submit"
            className="btn btn-primary mb-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Update password"}
          </button>
        </div>
      </form>
    </Fragment>
  );
}
