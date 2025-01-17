"use client";
import Spinner from "@/app/components/Spinner";
import { forgotPasswordSchema } from "@/app/schemas/auth";
import authService from "@/app/services/authService";
import { ForgotPasswordDto } from "@/app/types/auth";
import handlingError from "@/app/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<ForgotPasswordDto>({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });
  const urlSearchParams = useSearchParams();
  const error = urlSearchParams.get("error");

  const onSubmit = async (data: ForgotPasswordDto) => {
    try {
      const res = await authService.forgotPassword(data.email);
      toast.success(res.message);
      resetField("email");
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  return (
    <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">
      <div className="text-center">
        <h1 className="h1 mb-2 mt-4">Forgot password?</h1>
        <span className="d-block">
          Enter the email address associated with account.
        </span>
      </div>
      {error && <div className="alert alert-danger mt-4 mb-0">{error}</div>}

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 input-group-lg">
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            {...register("email")}
          />
          {errors.email && (
            <div className="form-text text-danger mt-1">
              {errors.email.message}
            </div>
          )}
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
          {isSubmitting ? <Spinner /> : "Send reset link"}
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
