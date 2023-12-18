"use client";

import { signUpSchema } from "@/app/utils/validation";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import usePasswordScore from "@/app/hooks/usePasswordScore";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { SignUpDto } from "@/app/types/auth";
import { signUp } from "@/app/services/authService";

const classNameScore: Record<number, string> = {
  0: "",
  1: "psms-20",
  2: "psms-40",
  3: "psms-60",
  4: "psms-80",
  5: "psms-100",
};

interface FormValue extends SignUpDto {
  confirmPassword: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { ref } = register("password");

  const onSubmit = async (data: FormValue) => {
    console.log("liu tiu diu");
    const { confirmPassword, ...values } = data;

    try {
      await signUp(values);
      redirect("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const togglePasswordType = () => {
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current.type === "password" ? "text" : "password";
    }
  };

  const passwordScore = usePasswordScore(watch("password"));

  return (
    <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">
      <div className="text-center">
        <h2 className="h1 mb-2">Sign up</h2>
        <span className="d-block">
          Already have an account? <Link href="/login">Sign in here</Link>
        </span>
      </div>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 input-group-lg">
          <input
            type="text"
            placeholder="Enter full name"
            className="form-control"
            {...register("fullName")}
          />
          {errors.fullName && (
            <div className="form-text text-danger mt-1">
              {errors.fullName.message}
            </div>
          )}
        </div>

        <div className="mb-3 input-group-lg">
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            {...register("email")}
          />
          {errors.email ? (
            <div className="form-text text-danger mt-1">
              {errors.email.message}
            </div>
          ) : (
            <small>We&apos;ll never share your email with anyone else.</small>
          )}
        </div>

        <div className="mb-3 position-relative">
          <div className="mb-0 input-group-lg d-flex">
            <input
              type="password"
              placeholder="Enter new password"
              className="form-control"
              {...register("password")}
              ref={(e) => {
                ref(e);
                passwordRef.current = e;
              }}
            />
            <button
              type="button"
              className="input-group-text p-0"
              onClick={togglePasswordType}
            >
              <FontAwesomeIcon icon={faEyeSlash} className="w-40px" />
            </button>
          </div>
          <div className="mt-2 password-strength-meter">
            <div
              className={`password-strength-meter-score ${classNameScore[passwordScore]}`}
            ></div>
          </div>
          <div className="d-flex mt-1">
            {errors.password ? (
              <div className="form-text text-danger mt-1">
                {errors.password.message}
              </div>
            ) : (
              <small>Write your password...</small>
            )}
          </div>
        </div>

        <div className="mb-3 input-group-lg">
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="form-text text-danger mt-1">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="mb-3 text-start">
          <input
            type="checkbox"
            id="keepSignedCheck"
            className="form-check-input"
            {...register("keepSignedIn")}
          />
          <label htmlFor="keepSignedCheck"> Keep me signed in</label>
        </div>
        <button type="submit" className="btn btn-lg btn-primary w-100">
          Sign me up
        </button>
      </form>
    </div>
  );
}
