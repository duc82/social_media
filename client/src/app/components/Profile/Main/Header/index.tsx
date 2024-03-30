"use client";
import Avatar from "@/app/components/Avatar";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Calendar2Plus,
  GeoAlt,
  PatchCheckFill,
  PencilFill,
  PlusLg,
} from "react-bootstrap-icons";
import ProfileMainHeaderMenu from "./Menu";
import { FullUser } from "@/app/types/user";
import useFriends from "@/app/hooks/useFriend";
import { formatDate } from "@/app/utils/dateTime";

export default function ProfileMainHeader({
  user,
  isMyProfile,
}: {
  user: FullUser;
  isMyProfile: boolean;
}) {
  const { total: totalFriends } = useFriends((state) => state);

  return (
    <div className="card">
      <div style={{ height: "200px" }}>
        <Link
          href={user.profile.wallpaper ?? "/wallpaper.jpg"}
          className="d-block h-100 position-relative"
          data-glightbox
          data-gallery="wallpaper"
        >
          <Image
            src={user.profile.wallpaper ?? "/wallpaper.jpg"}
            fill
            alt="Wallpaper"
            className="rounded-top object-fit-cover"
          />
        </Link>
      </div>

      <div className="card-body py-0">
        <div className="d-md-flex align-items-start text-center text-md-start">
          <Avatar
            src={user.profile.avatar ?? ""}
            alt={user.fullName}
            wrapperClassName="avatar avatar-xxl mt-n5 mb-3"
            className="rounded-circle border border-3 border-white "
          />

          <div className="ms-md-4 mt-md-3">
            <h1 className="mb-0 h5">
              {user.fullName} <PatchCheckFill className="text-success small" />
            </h1>
            <p>{totalFriends} friends</p>
          </div>

          {isMyProfile ? (
            <div className="d-flex mt-3 justify-content-center ms-md-auto">
              <button
                type="button"
                className="btn btn-primary-soft d-flex align-items-center me-2"
              >
                <PlusLg className="pe-1" />
                Add to story
              </button>
              <button
                type="button"
                className="btn btn-danger-soft d-flex align-items-center me-2"
              >
                <PencilFill className="pe-1" />
                Edit profile
              </button>
              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md btn btn-light"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-bookmark fa-fw pe-2"></i>Share profile
                      in a message
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save
                      your profile to PDF
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-lock fa-fw pe-2"></i>Lock profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-gear fa-fw pe-2"></i>Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex mt-3 justify-content-center ms-md-auto">
              <button
                type="button"
                className="btn btn-primary-soft d-flex align-items-center me-2"
              >
                <PlusLg className="pe-1" />
                Add friend
              </button>
              <button
                type="button"
                className="btn btn-danger-soft d-flex align-items-center me-2"
              >
                <PencilFill className="pe-1" />
                Message
              </button>
              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md btn btn-light"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-bookmark fa-fw pe-2"></i>Share profile
                      in a message
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save
                      your profile to PDF
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-lock fa-fw pe-2"></i>Lock profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-gear fa-fw pe-2"></i>Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <ul className="list-inline mb-0 text-center text-md-start mt-3 mt-md-0">
          <li className="list-inline-item d-inline-flex align-items-center">
            <Briefcase className="me-1" /> {user.profile.job ?? "Web Developer"}
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <GeoAlt className="me-1" />{" "}
            {user.profile.location ?? "New Hampshire"}
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <Calendar2Plus className="me-1" /> Joined on{" "}
            {formatDate(user.createdAt)}
          </li>
        </ul>
      </div>

      <div className="card-footer mt-3 pt-2 pb-0">
        <ProfileMainHeaderMenu />
      </div>
    </div>
  );
}
