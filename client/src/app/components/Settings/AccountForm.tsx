"use client";
import { userProfileSchema } from "@/app/schemas/user";
import userService from "@/app/services/userService";
import { FullUser, UpdateUserProfileDto } from "@/app/types/user";
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
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UpdateUserProfileDto>({
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

  const onSubmit = async (data: UpdateUserProfileDto) => {
    if (!session?.token) return;

    data.username = data.username?.replace("@", "");

    try {
      const { user, message } = await userService.updateUserProfile(
        data,
        session?.token
      );
      await update({ ...session, user });
      setMessage(message);
      router.refresh();
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
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
