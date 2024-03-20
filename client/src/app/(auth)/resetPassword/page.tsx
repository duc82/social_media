"use client";
import { resetPasswordSchema } from "@/app/schemas/auth";
import authService from "@/app/services/authService";
import { ResetPasswordDto } from "@/app/types/auth";
import handlingError from "@/app/utils/error";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDto>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const urlSearchParams = useSearchParams();

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

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token]);

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
              placeholder="Enter password"
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
          <div className="d-flex mt-1">
            {errors.password && (
              <div className="form-text text-danger mt-1">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-center">
            Back to <Link href="/signin">Sign in</Link>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-lg btn-primary w-100"
        >
          Reset password
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
