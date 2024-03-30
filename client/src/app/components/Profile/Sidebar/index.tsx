import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CalendarDate,
  ChatLeftText,
  Envelope,
  Heart,
  PersonX,
} from "react-bootstrap-icons";
import Avatar from "../../Avatar";
import Link from "next/link";
import Image from "next/image";
import { FullUser } from "@/app/types/user";
import { formatDate } from "@/app/utils/dateTime";

export default function ProfileSidebar({ user }: { user: FullUser }) {
  return (
    <div className="col-lg-4">
      <div className="row g-4">
        {/* About */}
        <div className="col-md-6 col-lg-12">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h5 className="card-title">About</h5>
            </div>
            <div className="card-body position-relative pt-0">
              {user.profile.overview && <p>{user.profile.overview}</p>}
              <ul className="list-unstyled mt-3 mb-0">
                <li className="mb-2">
                  <CalendarDate className="pe-1" size={20} />
                  Born: <strong>{formatDate(user.createdAt)}</strong>{" "}
                </li>
                {user.profile.maritalStatus && (
                  <li className="mb-2">
                    <Heart className="pe-1" size={20} />
                    Status: <strong> {user.profile.maritalStatus} </strong>{" "}
                  </li>
                )}
                <li>
                  <Envelope className="pe-1" size={20} />
                  Email: <strong> {user.email} </strong>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="col-md-6 col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between border-0">
              <h5 className="card-title">Experience</h5>
              <Link className="btn btn-primary-soft btn-sm" href="/">
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </div>

            <div className="card-body position-relative pt-0">
              <div className="d-flex">
                <Link href="/" className="avatar me-3">
                  <Avatar
                    className="avatar-img rounded-circle"
                    src="/08.svg"
                    alt=""
                  />
                </Link>
                <div>
                  <h6 className="card-title mb-0">
                    <Link href="/"> Apple Computer, Inc. </Link>
                  </h6>
                  <p className="small">
                    May 2015 - Present Employment Duration 8 mos{" "}
                    <Link className="btn btn-primary-soft btn-xs ms-2" href="/">
                      Edit
                    </Link>
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <Link href="/" className="avatar me-3">
                  <Avatar
                    className="avatar-img rounded-circle"
                    src="/09.svg"
                    alt=""
                  />
                </Link>
                <div>
                  <h6 className="card-title mb-0">
                    <Link href="/"> Microsoft Corporation </Link>
                  </h6>
                  <p className="small">
                    May 2017 - Present Employment Duration 1 yrs 5 mos{" "}
                    <Link className="btn btn-primary-soft btn-xs ms-2" href="/">
                      Edit
                    </Link>
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <Link href="/" className="avatar me-3">
                  <Avatar
                    className="avatar-img rounded-circle"
                    src="/10.svg"
                    alt=""
                  />
                </Link>
                <div>
                  <h6 className="card-title mb-0">
                    <Link href="/"> Tata Consultancy Services. </Link>
                  </h6>
                  <p className="small mb-0">
                    May 2022 - Present Employment Duration 6 yrs 10 mos{" "}
                    <Link className="btn btn-primary-soft btn-xs ms-2" href="/">
                      Edit
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="col-md-6 col-lg-12">
          <div className="card">
            <div className="card-header d-sm-flex justify-content-between border-0">
              <h5 className="card-title">Photos</h5>
              <Link className="btn btn-primary-soft btn-sm" href="#!">
                See all photo
              </Link>
            </div>
            <div className="card-body position-relative pt-0">
              <div className="row g-2">
                <div className="col-6">
                  <Link
                    href="/01.jpg"
                    data-gallery="image-popup"
                    data-glightbox=""
                  >
                    <Image
                      className="rounded img-fluid w-100 h-100"
                      src="/01.jpg"
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    href="/02.jpg"
                    data-gallery="image-popup"
                    data-glightbox=""
                  >
                    <Image
                      className="rounded img-fluid w-100"
                      src="/02.jpg"
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    href="/03.jpg"
                    data-gallery="image-popup"
                    data-glightbox=""
                  >
                    <Image
                      className="rounded img-fluid w-100"
                      src="/03.jpg"
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    href="/04.jpg"
                    data-gallery="image-popup"
                    data-glightbox=""
                  >
                    <Image
                      className="rounded img-fluid w-100"
                      src="/04.jpg"
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    href="/05.jpg"
                    data-gallery="image-popup"
                    data-glightbox=""
                  >
                    <Image
                      className="rounded img-fluid w-100"
                      src="/05.jpg"
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Friends */}
        <div className="col-md-6 col-lg-12">
          <div className="card">
            <div className="card-header d-sm-flex justify-content-between align-items-center border-0">
              <h5 className="card-title">
                Friends{" "}
                <span className="badge bg-danger bg-opacity-10 text-danger">
                  230
                </span>
              </h5>
              <Link className="btn btn-primary-soft btn-sm" href="/friends">
                See all friends
              </Link>
            </div>

            <div className="card-body position-relative pt-0">
              <div className="row g-3">
                <div className="col-6">
                  <div className="card shadow-none text-center h-100">
                    <div className="card-body p-2 pb-0">
                      <Link href="#!" className="avatar avatar-story avatar-xl">
                        <Avatar
                          className="avatar-img rounded-circle"
                          src="/02.jpg"
                          alt=""
                        />
                      </Link>
                      <h6 className="card-title mb-1 mt-3">
                        <Link href="#!"> Amanda Reed </Link>
                      </h6>
                      <p className="mb-0 small lh-sm">16 mutual connections</p>
                    </div>
                    <div className="card-footer p-2 border-0">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary me-1 me-lg-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        aria-label="Send message"
                        data-bs-original-title="Send message"
                      >
                        <ChatLeftText />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        aria-label="Remove friend"
                        data-bs-original-title="Remove friend"
                      >
                        <PersonX size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
