"use client";
import { createGroupSchema } from "@/app/schemas/group";
import groupService from "@/app/services/groupService";
import userService from "@/app/services/userService";
import { FilePreview } from "@/app/types";
import { CreateGroupDto } from "@/app/types/group";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
import clsx from "clsx";

export default function CreateGroupModal({ token }: { token: string }) {
  const [file, setFile] = useState<FilePreview | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupDto>({
    resolver: zodResolver(createGroupSchema),
    mode: "onChange",
    defaultValues: {
      access: "public",
    },
  });

  const debounceSearch = debounce(async (value: string) => {
    if (!value) return setUsers([]);

    try {
      const data = await userService.getAll(token, {
        search: value,
        page: 1,
        limit: 10,
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const getSearchResults = useCallback(debounceSearch, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    getSearchResults(value);
  };

  const onSubmit = async (data: CreateGroupDto) => {
    if (!file) {
      toast.error("Picture is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) {
        formData.append("description", data.description);
      }
      formData.append("file", file);
      for (const member of members) {
        formData.append("members[]", member);
      }
      formData.append("access", data.access);

      const group = await groupService.create(formData, token);

      closeRef.current?.click();
    } catch (error) {
      toast.error((error as Error).message);
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
                <label className="form-label">Group picture</label>
                <div className="d-flex align-items-center">
                  <div className="avatar-uploader me-3">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="avatarUpload"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            const file = files[0];
                            const preview = URL.createObjectURL(file);
                            const filePreview = Object.assign(file, {
                              preview,
                            });
                            setFile(filePreview);
                          }
                        }}
                      />
                      <label htmlFor="avatarUpload">
                        <FontAwesomeIcon icon={faPen} />
                      </label>
                    </div>
                    <div className="avatar avatar-xl position-relative">
                      <Image
                        id="avatar-preview"
                        className="avatar-img rounded-circle border border-white border-3 shadow"
                        src={file ? file.preview : "/placeholder.jpg"}
                        alt="Placeholder"
                        fill
                        onLoad={() => {
                          if (file) URL.revokeObjectURL(file.preview);
                        }}
                      />
                    </div>
                  </div>
                  <div className="avatar-remove">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setFile(null)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
                        <Link
                          href={`/profile/@${user.username}`}
                          className="d-flex align-items-center"
                        >
                          <div className="avatar">
                            <Avatar
                              src={user.profile.avatar}
                              alt={user.fullName}
                            />
                          </div>
                          <div className="ms-2">
                            <p className="mb-0">{user.fullName}</p>
                            {/* <small className="text-muted">{user.email}</small> */}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
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
              <button type="submit" className="btn btn-success-soft">
                Create now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
