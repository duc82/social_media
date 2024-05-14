"use client";

import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import usePasswordScore from "@/app/hooks/usePasswordScore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import handlingError from "@/app/utils/error";
import authService from "@/app/services/authService";
import { SignUpDto } from "@/app/types/auth";
import { signUpSchema } from "@/app/schemas/auth";
import clsx from "clsx";
import { ExclamationCircleFill, InfoCircle } from "react-bootstrap-icons";
import AvatarInitials from "@/app/utils/avatarInitials";
import { uploadFile } from "@/app/libs/firebase";
import InputGroup from "@/app/components/Form/InputGroup";

interface FormValue extends SignUpDto {
  confirmPassword: string;
}

const date = new Date();

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormValue>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      dateOfBirth: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      }
    }
  });

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const onSubmit = async (data: FormValue) => {
    const { confirmPassword, ...signUpDto } = data;

    try {
      const avatarBlob = await AvatarInitials.generateAvatar(
        signUpDto.fullName
      );
      signUpDto.avatar = await uploadFile(
        `avatars/${signUpDto.email}`,
        avatarBlob
      );
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

  const isLeapYear = (year: number) =>
    (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

  const getDays = (month: number, year: number) => {
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

  useEffect(() => {
    console.log(watch("dateOfBirth"));
  }, [watch("dateOfBirth")]);

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
        <InputGroup
          {...register("fullName")}
          id="fullName"
          placeholder="Full name"
          error={errors.fullName?.message}
        />

        <InputGroup
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
                  <ExclamationCircleFill size={16} className="me-2" />
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
              <InfoCircle
                size={16}
                data-bs-toggle="popover"
                data-bs-placement="top"
                data-bs-content="Include at least one uppercase, one lowercase, one special character, one number and 8 characters long."
              />
            </div>
          </div>
        </div>

        <InputGroup
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          error={errors.confirmPassword?.message}
        />

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of birth
          </label>

          <div className="d-flex">
            <select
              {...register("dateOfBirth.day", { valueAsNumber: true })}
              className="form-select me-3"
            >
              {getDays(watch("dateOfBirth.month"), watch("dateOfBirth.year"))}
            </select>

            <select
              {...register("dateOfBirth.month", { valueAsNumber: true })}
              className="form-select me-3"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {new Date(0, month - 1).toLocaleString("default", {
                    month: "short"
                  })}
                </option>
              ))}
            </select>

            <select
              {...register("dateOfBirth.year", { valueAsNumber: true })}
              className="form-select"
            >
              {getYears()}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-lg btn-primary w-100"
        >
          Sign me up
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
