import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../../Avatar";
import Link from "next/link";
import Image from "next/image";

export default function LeftSidebar() {
  return (
    <div className="col-lg-3">
      <button
        type="button"
        className="d-flex align-items-center d-lg-none bg-transparent border-0"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSideNavbar"
        aria-controls="offcanvasSideNavbar"
      >
        <span className="btn btn-primary">
          <FontAwesomeIcon icon={faSlidersH} />
        </span>
        <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
      </button>

      <div className="navbar navbar-expand-lg mx-0">
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasSideNavbar"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close ms-auto"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body d-block px-2 px-lg-0">
            <div className="card overflow-hidden bg-white">
              {/* Cover Image */}
              <div
                style={{
                  height: "50px",
                  backgroundImage: "url('/01.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              <div className="card-body pt-0">
                <div className="text-center">
                  <Avatar
                    src="/07.jpg"
                    height="4rem"
                    width="4rem"
                    wrapperClassName="d-inline-block mt-n4 mb-2"
                    className="border border-3 border-white"
                  />

                  <h5 className="mb-0">Sam Lanson</h5>
                  <small>Web Developer at Webestica</small>
                  <p className="mt-3">
                    I'd love to change the world, but they won't give me the
                    source code.
                  </p>
                  <div className="hstack gap-2 gap-xl-3 justify-content-center">
                    <div>
                      <h6 className="mb-0">256</h6>
                      <small>Post</small>
                    </div>
                    <div className="vr"></div>
                    <div>
                      <h6 className="mb-0">2.5K</h6>
                      <small>Followers</small>
                    </div>
                    <div className="vr"></div>
                    <div>
                      <h6 className="mb-0">365</h6>
                      <small>Following</small>
                    </div>
                  </div>
                </div>

                <hr />

                <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                  <li className="nav-item">
                    <Link
                      href="/profile"
                      className="nav-link d-flex align-items-center"
                    >
                      <Image
                        className="me-2"
                        src="home-outline-filled.svg"
                        alt="Feed"
                        width={20}
                        height={20}
                      />
                      <span>Feed </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      href="/profile/friends"
                    >
                      <Image
                        className="me-2"
                        src="/person-outline-filled.svg"
                        alt="Friends"
                        width={20}
                        height={20}
                      />
                      <span>Friends </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      href="/blog"
                    >
                      <Image
                        className="me-2"
                        src="/earth-outline-filled.svg"
                        alt="Latest News"
                        width={20}
                        height={20}
                      />
                      <span>Latest News </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      href="/profile/events"
                    >
                      <Image
                        className="me-2"
                        src="/calendar-outline-filled.svg"
                        alt="Events"
                        width={20}
                        height={20}
                      />
                      <span>Events </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      href="/groups"
                    >
                      <Image
                        className="me-2"
                        src="/chat-outline-filled.svg"
                        alt="Groups"
                        width={20}
                        height={20}
                      />
                      <span>Groups </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      href="/notifications"
                    >
                      <Image
                        className="me-2"
                        src="/notification-outlined-filled.svg"
                        alt="Notifications"
                        width={20}
                        height={20}
                      />
                      <span>Notifications </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      href="/settings"
                    >
                      <Image
                        className="me-2"
                        src="/cog-outline-filled.svg"
                        alt="Settings"
                        width={20}
                        height={20}
                      />
                      <span>Settings </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}