"use client";
import Spinner from "@/app/components/Spinner";
import usePasswordScore from "@/app/hooks/usePasswordScore";
import { resetPasswordSchema } from "@/app/schemas/auth";
import authService from "@/app/services/authService";
import { ResetPasswordDto } from "@/app/types/auth";
import handlingError from "@/app/utils/error";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ResetPassword() {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDto>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const error = urlSearchParams.get("error");
  const token = urlSearchParams.get("token");

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = async (data: ResetPasswordDto) => {
    if (!token) return;

    try {
      const res = await authService.resetPassword(token, data.password);
      toast.success(res.message);
      router.push("/signin");
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  const { pwdScore, pwdScoreClassName } = usePasswordScore(watch("password"));

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  return (
    <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">
      <div className="text-center">
        <h1 className="h1 mb-2">Reset password?</h1>
        <span className="d-block">
          Enter the new password for your account.
        </span>
      </div>
      {error && <div className="alert alert-danger mt-4 mb-0">{error}</div>}

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 position-relative">
          <div className="mb-0 input-group input-group-lg">
            <input
              type={passwordType}
              placeholder="Enter new password"
              className="form-control"
              {...register("password")}
              aria-describedby="passwordHelpBlock"
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
              {errors.password && (
                <p className="form-text text-danger mt-1">
                  {errors.password.message}
                </p>
              )}
              {!errors.password && pwdScore === 0 && (
                <p>Write your password...</p>
              )}
              {!errors.password && pwdScore === 5 && (
                <p>Yeah! that password rocks :))</p>
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

        <div className="mb-3">
          <p className="text-center">
            Back to{" "}
            <Link href="/signin" className="link-primary">
              Sign in
            </Link>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-lg btn-primary w-100 d-flex justify-content-center"
        >
          {isSubmitting ? <Spinner /> : "Reset password"}
        </button>

        <p className="mb-0 mt-3 text-center text-sm">
          ©{new Date().getFullYear()}{" "}
          <Link href="/" className="link-primary">
            Social.
          </Link>{" "}
          All rights reserved.
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
