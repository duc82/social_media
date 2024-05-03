"use client";
import { signInSchema } from "@/app/schemas/auth";
import { SignInDto } from "@/app/types/auth";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      isRemember: true
    }
  });
  const urlSearchParams = useSearchParams();
  const error = urlSearchParams.get("error");

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = async (data: SignInDto) => {
    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      ...data
    });
  };

  return (
    <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">
      <div className="text-center">
        <h1 className="h1 mb-2">Sign in</h1>
        <span className="d-block">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="link-primary">
            Click here to sign up
          </Link>
        </span>
      </div>
      {error && (
        <div className="alert alert-danger mt-4 mb-0" role="alert">
          {error}
        </div>
      )}

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

        <div className="mb-3 d-sm-flex justify-content-between">
          <div>
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="rememberCheck"
              {...register("isRemember")}
            />
            <label className="form-check-label" htmlFor="rememberCheck">
              Remember me?
            </label>
          </div>
          <Link href="/forgotPassword" className="link-primary">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-lg btn-primary w-100"
        >
          Login
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
