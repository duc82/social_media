"use client";

import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import usePasswordScore from "@/app/hooks/usePasswordScore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import handlingError from "@/app/utils/error";
import authService from "@/app/services/authService";
import { SignUpDto } from "@/app/types/auth";
import { signUpSchema } from "@/app/schemas/auth";
import clsx from "clsx";
import FormControl from "@/app/components/Form/FormControl";
import Radio from "@/app/components/Form/Radio";
import isLeapYear from "@/app/utils/isLeapYear";
import Spinner from "@/app/components/Spinner";

const date = new Date();

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      dateOfBirth: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
    },
  });

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const onSubmit = async (data: SignUpDto) => {
    const { confirmPassword: _, ...signUpDto } = data;

    try {
      const birthday = new Date(
        data.dateOfBirth.year,
        data.dateOfBirth.month - 1,
        data.dateOfBirth.day
      ).toISOString();
      signUpDto.birthday = birthday;

      const value = await authService.signUp(signUpDto);
      toast.success(value.message);
      router.push("/signin");
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const { pwdScore, pwdScoreClassName } = usePasswordScore(watch("password"));

  const getDays = () => {
    const month = watch("dateOfBirth.month");
    const year = watch("dateOfBirth.year");

    const isLeap = isLeapYear(year);

    let length = 31;

    if (month === 2) {
      length = isLeap ? 29 : 28;
    }

    if ([4, 6, 9, 11].includes(month)) {
      length = 30;
    }

    return Array.from({ length }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));
  };

  const getMonths = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
      <option key={month} value={month}>
        {new Date(0, month - 1).toLocaleString("default", {
          month: "short",
        })}
      </option>
    ));
  };

  const getYears = () => {
    const years = [];
    const start = date.getFullYear();
    const end = 1900;

    for (let i = start; i >= end; i--) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return years;
  };

  return (
    <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">
      <div className="text-center">
        <h1 className="h1 mb-2">Sign up</h1>
        <span className="d-block">
          Already have an account?{" "}
          <Link href="/signin" className="link-primary">
            Sign in here
          </Link>
        </span>
      </div>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex gap-3">
          <FormControl
            {...register("firstName")}
            id="firstName"
            placeholder="First name"
            error={errors.firstName?.message}
          />
          <FormControl
            {...register("lastName")}
            id="lastName"
            placeholder="Last name"
            error={errors.lastName?.message}
          />
        </div>

        <FormControl
          {...register("email")}
          type="email"
          id="email"
          placeholder="Email address"
          error={errors.email?.message}
          text={
            <small>We&apos;ll never share your email with anyone else.</small>
          }
        />

        <div className="mb-3 position-relative">
          <div className="mb-0 input-group input-group-lg">
            <input
              type={passwordType}
              placeholder="New password"
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
                <div className="form-text text-danger mt-1">
                  <i className="bi bi-exclamation-circle-fill me-2"></i>
                  <span>{errors.password.message}</span>
                </div>
              )}
              {!errors.password && pwdScore === 0 && (
                <span>Write your password...</span>
              )}
              {!errors.password && pwdScore === 5 && (
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

        <FormControl
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <div className="mb-3">
          <p className="mb-1">Date of birth</p>

          <div className="d-flex">
            <select
              {...register("dateOfBirth.day", { valueAsNumber: true })}
              className="form-select me-3"
              defaultValue={date.getDate()}
            >
              {getDays()}
            </select>

            <select
              {...register("dateOfBirth.month", { valueAsNumber: true })}
              className="form-select me-3"
              defaultValue={date.getMonth() + 1}
            >
              {getMonths()}
            </select>

            <select
              {...register("dateOfBirth.year", { valueAsNumber: true })}
              className="form-select"
              defaultValue={date.getFullYear()}
            >
              {getYears()}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-1">Gender</p>
          <div className="d-flex align-items-center">
            <Radio
              {...register("gender")}
              id="male"
              value="male"
              wrapperClassName="me-3"
              text="Male"
            />

            <Radio
              {...register("gender")}
              id="female"
              value="female"
              wrapperClassName="me-3"
              text="Female"
            />

            <Radio
              {...register("gender")}
              id="other"
              value="other"
              text="Other"
            />
          </div>

          {errors.gender && (
            <div className="form-text text-danger mt-1">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              <span>{errors.gender.message}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-lg btn-primary w-100 d-flex justify-content-center"
        >
          {isSubmitting ? <Spinner /> : "Sign me up"}
        </button>

        <p className="mb-0 mt-3 text-center text-sm">
          ©{date.getFullYear()}{" "}
          <Link href="/" className="link-primary">
            Social.
          </Link>{" "}
          All rights reserved.
        </p>
      </form>
    </div>
  );
}
