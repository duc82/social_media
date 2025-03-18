"use client";
import userService from "@/app/services/userService";
import { FullUser, GENDER, MARIAL_STATUS, Profile } from "@/app/types/user";
import { formatDate } from "@/app/utils/dateTime";
import handlingError from "@/app/utils/error";
import { useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileInfo({
  user,
  isMyProfile,
}: {
  user: FullUser;
  isMyProfile: boolean;
}) {
  const [values, setValues] = useState<Profile>(user.profile);
  const [edits, setEdits] = useState({} as Record<keyof Profile, boolean>);
  const router = useRouter();
  const { data: session, update } = useSession();

  const handleToggleEdit = (key: keyof Profile) => {
    setEdits((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChangeValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateProfile = async (
    key: keyof Profile,
    type: "edit" | "delete" = "edit"
  ) => {
    if (!session?.token) return;

    const value = values[key] ?? "";

    const formData = new FormData();
    formData.append(key, value);
    formData.append("type", type);

    try {
      const { user: newUser } = await userService.update(
        user.id,
        formData,
        session.token
      );
      await update({ ...session, newUser });
      setEdits((prev) => ({ ...prev, [key]: false }));
      setValues(newUser.profile);
      router.refresh();
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  const renderMyProfile = () => {
    return (
      <>
        {/* Birthday */}
        <div className="col-sm-6">
          <div
            className="align-items-center rounded border px-3 py-2"
            style={{
              display: edits.birthday ? "none" : "flex",
            }}
          >
            <p className="mb-0">
              <i className="bi bi-calendar-date me-2"></i>
              Born:
              <strong>
                {" "}
                {formatDate(values.birthday, {
                  dateStyle: "medium",
                })}
              </strong>
            </p>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="aboutAction2"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleToggleEdit("birthday")}
                  >
                    <i className="bi bi-pencil-square pe-2"></i>
                    Edit
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {edits.birthday && (
            <div>
              <label htmlFor="birthday" className="d-none">
                Birthday
              </label>
              <input
                type="date"
                className="form-control py-2 px-3"
                name="birthday"
                value={values.birthday}
                onChange={handleChangeValues}
              />

              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={() => handleToggleEdit("birthday")}
                >
                  Cancel
                </button>
                <button
                  disabled={!values.birthday}
                  type="button"
                  onClick={() => handleUpdateProfile("birthday")}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="col-sm-6">
          <div
            className="align-items-center rounded border px-3 py-2"
            style={{
              display: edits.gender ? "none" : "flex",
            }}
          >
            <p className="mb-0">
              <i className="bi bi-gender-ambiguous me-2"></i>
              Gender:
              <strong className="text-capitalize"> {values.gender}</strong>
            </p>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleToggleEdit("gender")}
                  >
                    <i className="bi bi-pencil-square pe-2"></i>
                    Edit
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {edits.gender && (
            <div>
              <label htmlFor="gender" className="d-none">
                Gender
              </label>
              <select
                className="form-select py-2 px-3"
                name="gender"
                value={values.gender}
                onChange={handleChangeValues}
              >
                {GENDER.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </option>
                ))}
              </select>
              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={() => handleToggleEdit("gender")}
                >
                  Cancel
                </button>
                <button
                  disabled={!values.gender}
                  type="button"
                  onClick={() => handleUpdateProfile("gender")}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="col-sm-6">
          <div
            className="align-items-center rounded border px-3 py-2"
            style={{
              display:
                values.maritalStatus && !edits.maritalStatus ? "flex" : "none",
            }}
          >
            <p className="mb-0">
              <i className="bi bi-heart me-2"></i>
              Status:
              <strong className="text-capitalize">
                {" "}
                {values.maritalStatus}
              </strong>
            </p>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleToggleEdit("maritalStatus")}
                  >
                    <i className="bi bi-pencil-square pe-2"></i>
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() =>
                      handleUpdateProfile("maritalStatus", "delete")
                    }
                  >
                    <i className="bi bi-trash pe-2"></i>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {!values.maritalStatus && !edits.maritalStatus && (
            <button
              type="button"
              className="btn btn-dashed rounded w-100"
              onClick={() => handleToggleEdit("maritalStatus")}
            >
              <i className="bi bi-plus-circle-dotted me-1"></i>
              <span>Add a status</span>
            </button>
          )}

          {edits.maritalStatus && (
            <div>
              <label htmlFor="marialStatus" className="d-none">
                Status
              </label>
              <select
                className="form-select py-2 px-3"
                name="maritalStatus"
                value={values.maritalStatus ?? ""}
                onChange={handleChangeValues}
              >
                <option value="">Select a status</option>
                {MARIAL_STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={() => handleToggleEdit("maritalStatus")}
                >
                  Cancel
                </button>
                <button
                  disabled={!values.maritalStatus}
                  type="button"
                  onClick={() => handleUpdateProfile("maritalStatus")}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Job */}
        <div className="col-sm-6">
          <div
            className="align-items-center rounded border px-3 py-2"
            style={{
              display: values.job && !edits.job ? "flex" : "none",
            }}
          >
            <p className="mb-0">
              <i className="bi bi-briefcase me-2"></i>
              Job:
              <strong> {values.job}</strong>
            </p>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="aboutAction2"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleToggleEdit("job")}
                  >
                    <i className="bi bi-pencil-square pe-2"></i>
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleUpdateProfile("job", "delete")}
                  >
                    <i className="bi bi-trash pe-2"></i>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {!values.job && !edits.job && (
            <button
              type="button"
              className="btn btn-dashed rounded w-100"
              onClick={() => handleToggleEdit("job")}
            >
              <i className="bi bi-plus-circle-dotted me-1"></i>
              <span>Add a job</span>
            </button>
          )}

          {edits.job && (
            <div>
              <label htmlFor="birthday" className="d-none">
                Job
              </label>
              <input
                type="text"
                className="form-control py-2 px-3"
                name="job"
                value={values.job ?? ""}
                placeholder="Add a job"
                onChange={handleChangeValues}
              />

              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={() => handleToggleEdit("job")}
                >
                  Cancel
                </button>
                <button
                  disabled={!values.job}
                  type="button"
                  onClick={() => handleUpdateProfile("job")}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lives in */}
        <div className="col-sm-6">
          <div
            className="align-items-center rounded border px-3 py-2"
            style={{
              display: values.address && !edits.address ? "flex" : "none",
            }}
          >
            <p className="mb-0">
              <i className="bi bi-geo-alt me-2"></i>
              Address:
              <strong> {values.address}</strong>
            </p>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="aboutAction2"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleToggleEdit("address")}
                  >
                    <i className="bi bi-pencil-square pe-2"></i>
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleUpdateProfile("address", "delete")}
                  >
                    <i className="bi bi-trash pe-2"></i>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {!values.address && !edits.address && (
            <button
              type="button"
              className="btn btn-dashed rounded w-100"
              onClick={() => handleToggleEdit("address")}
            >
              <i className="bi bi-plus-circle-dotted me-1"></i>
              <span>Add a address</span>
            </button>
          )}

          {edits.address && (
            <div>
              <label htmlFor="address" className="d-none">
                Lives in
              </label>
              <input
                type="text"
                className="form-control py-2 px-3"
                name="address"
                value={values.address ?? ""}
                placeholder="Add a address"
                onChange={handleChangeValues}
              />

              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={() => handleToggleEdit("address")}
                >
                  Cancel
                </button>
                <button
                  disabled={!values.address}
                  type="button"
                  onClick={() => handleUpdateProfile("address")}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Workplace */}
        <div className="col-sm-6">
          <div
            className="align-items-center rounded border px-3 py-2"
            style={{
              display: values.workplace && !edits.workplace ? "flex" : "none",
            }}
          >
            <p className="mb-0">
              <i className="bi bi-geo-alt me-2"></i>
              Workplace:
              <strong> {values.workplace}</strong>
            </p>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="aboutAction2"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleToggleEdit("workplace")}
                  >
                    <i className="bi bi-pencil-square pe-2"></i>
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleUpdateProfile("address", "delete")}
                  >
                    <i className="bi bi-trash pe-2"></i>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {!values.workplace && !edits.workplace && (
            <button
              type="button"
              className="btn btn-dashed rounded w-100"
              onClick={() => handleToggleEdit("workplace")}
            >
              <i className="bi bi-plus-circle-dotted me-1"></i>
              <span>Add a workplace</span>
            </button>
          )}

          {edits.workplace && (
            <div>
              <label htmlFor="workplace" className="d-none">
                Workplace
              </label>
              <input
                type="text"
                className="form-control py-2 px-3"
                name="workplace"
                value={values.workplace ?? ""}
                placeholder="Add a workplace"
                onChange={handleChangeValues}
              />

              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={() => handleToggleEdit("workplace")}
                >
                  Cancel
                </button>
                <button
                  disabled={!values.workplace}
                  type="button"
                  onClick={() => handleUpdateProfile("workplace")}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        <div className="col-sm-6">
          <div
            className="align-items-center rounded border px-3 py-2"
            style={{
              display: values.education && !edits.education ? "flex" : "none",
            }}
          >
            <p className="mb-0">
              <i className="bi bi-geo-alt me-2"></i>
              Education:
              <strong> {values.education}</strong>
            </p>
            <div className="dropdown ms-auto">
              <button
                type="button"
                className="nav nav-link text-secondary mb-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="aboutAction2"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleToggleEdit("education")}
                  >
                    <i className="bi bi-pencil-square pe-2"></i>
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleUpdateProfile("education", "delete")}
                  >
                    <i className="bi bi-trash pe-2"></i>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {!values.education && !edits.education && (
            <button
              type="button"
              className="btn btn-dashed rounded w-100"
              onClick={() => handleToggleEdit("education")}
            >
              <i className="bi bi-plus-circle-dotted me-1"></i>
              <span>Add a education</span>
            </button>
          )}

          {edits.education && (
            <div>
              <label htmlFor="education" className="d-none">
                Education
              </label>
              <input
                type="text"
                className="form-control py-2 px-3"
                name="education"
                value={values.education ?? ""}
                placeholder="Add a education"
                onChange={handleChangeValues}
              />

              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={() => handleToggleEdit("education")}
                >
                  Cancel
                </button>
                <button
                  disabled={!values.education}
                  type="button"
                  onClick={() => handleUpdateProfile("education")}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderProfile = () => {
    return (
      <>
        {user.profile.birthday && (
          <div className="col-sm-6">
            <div className="align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <i className="bi bi-calendar-date me-2"></i>
                Born:
                <strong className="text-capitalize"> {values.job}</strong>
              </p>
            </div>
          </div>
        )}

        {user.profile.maritalStatus && (
          <div className="col-sm-6">
            <div className="align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <i className="bi bi-heart me-2"></i>
                Status:
                <strong className="text-capitalize">
                  {" "}
                  {values.maritalStatus}
                </strong>
              </p>
            </div>
          </div>
        )}

        {user.profile.job && (
          <div className="col-sm-6">
            <div className="align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <i className="bi bi-briefcase me-2"></i>
                Job:
                <strong className="text-capitalize"> {values.job}</strong>
              </p>
            </div>
          </div>
        )}

        {user.profile.address && (
          <div className="col-sm-6">
            <div className="align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <i className="bi bi-geo-alt me-2"></i>
                Lives in:
                <strong className="text-capitalize"> {values.address}</strong>
              </p>
            </div>
          </div>
        )}

        {user.profile.gender && (
          <div className="col-sm-6">
            <div className="align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <i className="bi bi-gender-ambiguous me-2"></i>
                Gender:
                <strong className="text-capitalize"> {values.gender}</strong>
              </p>
            </div>
          </div>
        )}

        {user.profile.workplace && (
          <div className="col-sm-6">
            <div className="align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <i className="bi bi-play-circle me-2"></i>
                Workplace:
                <strong className="text-capitalize"> {values.workplace}</strong>
              </p>
            </div>
          </div>
        )}

        {user.profile.education && (
          <div className="col-sm-6">
            <div className="align-items-center rounded border px-3 py-2">
              <p className="mb-0">
                <i className="bi bi-play-circle me-2"> </i>
                Education:
                <strong className="text-capitalize"> {values.education}</strong>
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* Overview */}
      {user.profile.bio && (
        <div className="rounded border px-3 py-2 mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <h6>Overview</h6>
            {isMyProfile && (
              <div className="dropdown ms-auto">
                <button
                  type="button"
                  className="nav nav-link text-secondary mb-0"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="aboutAction"
                >
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleToggleEdit("bio")}
                    >
                      <i className="bi bi-pencil-square pe-2"></i>
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleUpdateProfile("bio", "delete")}
                    >
                      <i className="bi bi-trash pe-2"></i>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <p>{user.profile.bio}</p>
        </div>
      )}

      {/* Basic Info */}
      <div className="row g-4">
        {isMyProfile ? renderMyProfile() : renderProfile()}

        <div className="col-sm-6">
          <div className="d-flex align-items-center rounded border px-3 py-2">
            <p className="mb-0">
              <i className="bi bi-calendar2-plus me-2"></i>
              Joined:
              <strong>
                {" "}
                {formatDate(user.createdAt, {
                  dateStyle: "medium",
                })}
              </strong>
            </p>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="d-flex align-items-center rounded border px-3 py-2">
            <p className="mb-0">
              <i className="bi bi-envelope me-2"></i>
              Email:
              <strong> {user.email}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
