"use client";
import FormControl from "@/app/components/Form/FormControl";
import Spinner from "@/app/components/Spinner";
import { signInSchema } from "@/app/schemas/auth";
import apiRequest from "@/app/services/api";
import { SignInDto } from "@/app/types/auth";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      isRemember: true,
    },
  });
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

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
      ...data,
    });
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

      {code && (
        <div
          className="alert alert-danger lh-1 mt-4 mb-0 d-flex align-items-center justify-content-between"
          role="alert"
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0"></i>
            <span>{code}</span>
          </div>
          <button
            type="button"
            className="btn-close flex-shrink-0"
            onClick={() => router.push(pathname)}
          ></button>
        </div>
      )}

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter email"
          error={errors.email?.message}
        />

        <div className="mb-3 position-relative">
          <div className="mb-0 input-group input-group-lg">
            <input
              type={passwordType}
              placeholder="Enter password"
              className="form-control"
              {...register("password")}
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
          {errors.password && (
            <div className="form-text text-danger mt-1">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              <span>{errors.password.message}</span>
            </div>
          )}
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <FormControl
            {...register("isRemember")}
            type="checkbox"
            wrapperClassName="d-flex align-items-center"
            className="form-check-input cursor-pointer mt-0 me-2"
            id="rememberCheck"
            labelProps={{
              className: "form-check-label order-2",
              children: "Remember me?",
              hidden: false,
            }}
          />
          <Link href="/forgotPassword" className="link-primary">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-lg btn-primary w-100 d-flex justify-content-center"
        >
          {isSubmitting ? <Spinner /> : "Login"}
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
