"use client";
import { createGroupSchema } from "@/app/schemas/group";
import groupService from "@/app/services/groupService";
import userService from "@/app/services/userService";
import { CreateGroupDto } from "@/app/types/group";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
import clsx from "clsx";
import Spinner from "../Spinner";
import placeholder from "@/app/assets/images/placeholder.jpg";
import { revalidateTag } from "@/app/actions/indexAction";
import handlingError from "@/app/utils/error";

export default function CreateGroupModal({ token }: { token: string }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<FullUser[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupDto>({
    resolver: zodResolver(createGroupSchema),
    mode: "onChange",
    defaultValues: {
      access: "public",
    },
  });

  const pictureFile = watch("pictureFile");
  const wallpaperFile = watch("wallpaperFile");

  const getSearchResults = useCallback(
    debounce(async (value: string) => {
      if (!value) return setUsers([]);

      try {
        const data = await userService.getAll(token, {
          search: value,
          page: 1,
          limit: 10,
          exclude: JSON.stringify(selectedUsers.map((user) => user.id)),
        });

        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [selectedUsers, token]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    getSearchResults(value);
  };

  const onSubmit = async (data: CreateGroupDto) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) {
        formData.append("description", data.description);
      }
      for (const member of selectedUsers) {
        formData.append("members[]", member.id);
      }
      formData.append("access", data.access);
      formData.append("files", data.pictureFile);
      formData.append("files", data.wallpaperFile);
      await groupService.create(formData, token);
      await revalidateTag("groups");
      reset();
      closeRef.current?.click();
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  return (
    <div className="modal fade" id="createGroupModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Group</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeRef}
            ></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Group name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Group name here"
                  {...register("name")}
                />
                {errors.name && (
                  <div className="form-text text-danger mt-1">
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    <span>{errors.name.message}</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Group wallpaper</label>
                <Controller
                  control={control}
                  name="wallpaperFile"
                  render={({ field }) => (
                    <div className="avatar-uploader">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="wallpaperUpload"
                          className="d-none"
                          accept="image/*"
                          multiple={false}
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              const file = files[0];
                              const preview = URL.createObjectURL(file);
                              const filePreview = Object.assign(file, {
                                preview,
                              });
                              field.onChange(filePreview);
                            }
                          }}
                        />

                        <label htmlFor="wallpaperUpload">
                          <FontAwesomeIcon icon={faPen} />
                        </label>
                      </div>

                      <div
                        style={{
                          background: "rgb(230,230,230)",
                          width: "100%",
                          height: 200,
                          backgroundImage:
                            wallpaperFile && `url('${wallpaperFile.preview}')`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                        className="rounded-2"
                      ></div>
                    </div>
                  )}
                />
                {errors.wallpaperFile && (
                  <div className="form-text text-danger mt-1">
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    <span>{errors.wallpaperFile.message}</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Group picture</label>
                <div className="d-flex align-items-center">
                  <div className="avatar-uploader me-3">
                    <Controller
                      control={control}
                      name="pictureFile"
                      render={({ field }) => (
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="avatarUpload"
                            className="d-none"
                            accept="image/*"
                            multiple={false}
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files) {
                                const file = files[0];
                                const preview = URL.createObjectURL(file);
                                const filePreview = Object.assign(file, {
                                  preview,
                                });
                                field.onChange(filePreview);
                              }
                            }}
                          />
                          <label htmlFor="avatarUpload">
                            <FontAwesomeIcon icon={faPen} />
                          </label>
                        </div>
                      )}
                    />

                    <div className="avatar avatar-xl position-relative">
                      <Avatar
                        className="rounded-circle border border-white border-3 shadow"
                        src={
                          pictureFile ? pictureFile.preview : placeholder.src
                        }
                        alt="Placeholder"
                        onLoad={() => {
                          if (pictureFile)
                            URL.revokeObjectURL(pictureFile.preview);
                        }}
                      />
                    </div>
                  </div>
                  <div className="avatar-remove">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setValue("pictureFile", undefined as any)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {errors.pictureFile && (
                  <div className="form-text text-danger mt-1">
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    <span>{errors.pictureFile.message}</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label d-block">Select audience</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="publicRadio"
                    value="public"
                    {...register("access")}
                  />
                  <label className="form-check-label" htmlFor="publicRadio">
                    Public
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="privateRadio"
                    value="private"
                    {...register("access")}
                  />
                  <label className="form-check-label" htmlFor="privateRadio">
                    Private
                  </label>
                </div>
              </div>
              <div className="mb-3 position-relative">
                <label className="form-label">Invite friend </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add friend name here"
                  value={search}
                  onChange={handleSearch}
                />
                <ul
                  className={clsx(
                    "dropdown-menu w-100",
                    users.length > 0 && "d-block"
                  )}
                >
                  {users.map((user) => {
                    return (
                      <li key={user.id} className="dropdown-item">
                        <div
                          onClick={() => {
                            setSelectedUsers((prev) => [...prev, user]);
                            setSearch("");
                            setUsers([]);
                          }}
                          className="cursor-pointer d-flex align-items-center"
                        >
                          <div className="avatar">
                            <Avatar
                              src={user.profile.avatar}
                              alt={user.fullName}
                            />
                          </div>
                          <div className="ms-2">
                            <p className="mb-0">{user.fullName}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div>
                  {selectedUsers.map((user) => {
                    return (
                      <span key={user.id} className="badge bg-primary me-1">
                        {user.fullName}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Group description </label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Description here"
                  {...register("description")}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-success-soft"
              >
                {isSubmitting ? <Spinner /> : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
