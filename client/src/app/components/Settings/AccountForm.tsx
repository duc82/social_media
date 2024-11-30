"use client";
import { userProfileSchema } from "@/app/schemas/user";
import userService from "@/app/services/userService";
import { FullUser, UpdateUserDto } from "@/app/types/user";
import { formatBirthday } from "@/app/utils/dateTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";

export default function AccountForm({
  currentUser,
}: {
  currentUser: FullUser;
}) {
  const { update, data: session } = useSession();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(userProfileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      username: `@${currentUser.username}`,
      birthday: formatBirthday(currentUser.profile.birthday),
      bio: currentUser.profile.bio,
    },
  });

  const onSubmit = async (data: UpdateUserDto) => {
    if (!session?.token) return;

    const formData = new FormData();
    formData.append("username", data.username.replace("@", ""));
    if (data.bio) {
      formData.append("bio", data.bio);
    }
    if (data.firstName !== currentUser.firstName) {
      formData.append("firstName", data.firstName);
    }
    if (data.lastName !== currentUser.lastName) {
      formData.append("lastName", data.lastName);
    }

    if (data.birthday !== currentUser.profile.birthday) {
      formData.append("birthday", data.birthday);
    }

    try {
      const { user, message } = await userService.update(
        currentUser.id,
        formData,
        session?.token
      );

      await update({ ...session, user });
      setMessage(message);
      setError("");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Update failed");
      setMessage("");
    }
  };

  return (
    <div>
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
            <i className="bi bi-check-circle-fill me-2 flex-shrink-0"> </i>
            <span>{message}</span>
          </div>
        </div>
      )}
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-sm-6">
          <label className="form-label" htmlFor="firstName">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            {...register("firstName")}
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label" htmlFor="lastName">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            {...register("lastName")}
          />
        </div>

        <div className="col-sm-6">
          <label className="form-label" htmlFor="username">
            User name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            {...register("username", {
              onChange: (e) => {
                const value = e.target.value.replace(/\W/g, "");
                setValue("username", `@${value}`);
              },
            })}
          />
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="birthday">
            Birthday{" "}
          </label>
          <input
            type="date"
            id="birthday"
            className="form-control flatpickr flatpickr-input"
            {...register("birthday")}
          />
        </div>

        <div className="col-sm-6">
          <label className="form-label" htmlFor="phone">
            Phone number
          </label>
          <input
            type="text"
            id="phone"
            className="form-control"
            defaultValue="(678) 324-1251"
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            defaultValue={currentUser.email}
            readOnly
          />
        </div>
        <div className="col-12">
          <label className="form-label">Overview</label>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Description (Required)"
            {...register("bio")}
          ></textarea>
          <small>Character limit: 300</small>
        </div>
        <div className="col-12 text-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-sm btn-primary mb-0"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
