import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../../Avatar";
import Link from "next/link";
import Image from "next/image";
import getServerSession from "@/app/libs/session";
import calendar_outline_filled from "@/app/assets/images/calendar-outline-filled.svg";
import chat_outline_filled from "@/app/assets/images/chat-outline-filled.svg";
import cog_outline_filled from "@/app/assets/images/cog-outline-filled.svg";
import earth_outline_filled from "@/app/assets/images/earth-outline-filled.svg";
import home_outline_filled from "@/app/assets/images/home-outline-filled.svg";
import notification_outlined_filled from "@/app/assets/images/notification-outlined-filled.svg";
import person_outline_filled from "@/app/assets/images/person-outline-filled.svg";
import formatName from "@/app/utils/formatName";
import wallpaper_initial from "@/app/assets/images/wallpaper.webp";

export default async function LeftSidebar() {
  const { currentUser } = await getServerSession();

  const fullName = formatName(currentUser.firstName, currentUser.lastName);

  const wallpaper = currentUser.profile.wallpaper || wallpaper_initial.src;

  return (
    <div className="col-lg-3">
      <div className="sticky" style={{ top: "calc(1.5rem + 56px)" }}>
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
              <div className="card overflow-hidden">
                {/* Cover Image */}
                <div
                  style={{
                    height: "50px",
                    backgroundImage: `url('${wallpaper}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                <div className="card-body pt-0">
                  <div className="text-center">
                    <div
                      className="avatar d-inline-block mt-n4 mb-2"
                      style={{ width: "4rem", height: "4rem" }}
                    >
                      <Avatar
                        src={currentUser.profile.avatar ?? "/01.jpg"}
                        alt={fullName}
                        className="border border-3 border-white"
                      />
                    </div>

                    <h5 className="mb-0">{fullName}</h5>
                    {currentUser?.profile.job && (
                      <small>{currentUser.profile.job}</small>
                    )}

                    <p className="mt-3">
                      I&apos;d love to change the world, but they won&apos;t
                      give me the source code.
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
                        href={`/profile/${currentUser?.id}`}
                        className="nav-link d-flex align-items-center"
                      >
                        <Image
                          className="me-2"
                          src={home_outline_filled}
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
                        href="/friends"
                      >
                        <Image
                          className="me-2"
                          src={person_outline_filled}
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
                          src={earth_outline_filled}
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
                          src={calendar_outline_filled}
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
                          src={chat_outline_filled}
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
                          src={notification_outlined_filled}
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
                          src={cog_outline_filled}
                          alt="Settings"
                          width={20}
                          height={20}
                        />
                        <span>Settings </span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="card-footer text-center py-2">
                  <Link
                    href={`/profile/${currentUser?.id}`}
                    className="btn btn-link btn-sm p-0"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              <ul className="nav small mt-4 justify-content-center lh-1">
                <li className="nav-item">
                  <Link className="nav-link" href="my-profile-about.html">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="settings.html">
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    target="_blank"
                    href="https://support.webestica.com/login"
                  >
                    Support{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    target="_blank"
                    href="docs/index.html"
                  >
                    Docs{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="help.html">
                    Help
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="privacy-and-terms.html">
                    Privacy &amp; terms
                  </Link>
                </li>
              </ul>

              <p className="small text-center mt-1">
                ©{new Date().getFullYear()}{" "}
                <Link
                  className="text-reset"
                  target="_blank"
                  href="https://www.webestica.com/"
                >
                  {" "}
                  Webestica{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
