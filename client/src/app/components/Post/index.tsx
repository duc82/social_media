import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";
import {
  Bookmark,
  ChatFill,
  Flag,
  HandThumbsUpFill,
  PersonX,
  ReplyFill,
  SlashCircle,
  ThreeDots,
  XCircle,
} from "react-bootstrap-icons";

export default function Post() {
  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link href="#!" className="avatar avatar-story me-2">
              <Avatar
                className="avatar-img rounded-circle"
                src="/04.jpg"
                alt="Avatar"
              />
            </Link>
            <div>
              <div className="nav nav-divider">
                <Link href="#!" className="nav-item card- mb-0 h6">
                  Lori Ferguson
                </Link>
                <span className="nav-item small"> 2hr</span>
              </div>
              <p className="mb-0 small">Web Developer at Webestica</p>
            </div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
              id="cardFeedAction1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ThreeDots />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="cardFeedAction1"
            >
              <li>
                <Link className="dropdown-item" href="#">
                  <Bookmark className="fa-fw pe-2" />
                  Save post
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <PersonX className="fa-fw pe-2" />
                  Unfollow lori ferguson
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <XCircle className="fa-fw pe-2" />
                  Hide post
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <SlashCircle className="fa-fw pe-2" />
                  Block
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <Flag className="fa-fw pe-2" />
                  Report post
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p>
          I'm thrilled href share that I've completed a graduate certificate
          course in project management with the president's honor roll.
        </p>
        <Image
          src="/01.jpg"
          alt="Post"
          width={0}
          height={0}
          sizes="100vw"
          className="card-img h-auto"
        />
        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <Link
              className="nav-link fw-normal d-flex align-items-start active"
              href="#!"
            >
              <HandThumbsUpFill className="pe-1" size={18} />
              Liked (56)
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link fw-normal d-flex align-items-start"
              href="#!"
            >
              <ChatFill className="pe-1" size={18} />
              Comments (12)
            </Link>
          </li>
          <li className="nav-item dropdown ms-sm-auto">
            <button
              type="button"
              className="nav-link mb-0 fw-normal d-flex align-items-start"
              id="cardShareAction8"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ReplyFill className="flip-horizontal ps-1" size={18} />
              Share (3)
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="cardShareAction8"
            >
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-envelope fa-fw pe-2"></i>
                  Send via Direct Message
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-bookmark-check fa-fw pe-2"></i>Bookmark{" "}
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-link fa-fw pe-2"></i>Copy link href post
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-share fa-fw pe-2"></i>Share post via …
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-pencil-square fa-fw pe-2"></i>Share href
                  News Feed
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="d-flex mb-3">
          <div className="avatar avatar-xs me-2">
            <Link href="#!">
              <Avatar
                className="avatar-img rounded-circle"
                src="/10.jpg"
                alt=""
              />
            </Link>
          </div>
          <form className="position-relative w-100">
            <textarea
              className="form-control pe-4 bg-light"
              rows={1}
              placeholder="Add a comment..."
            />
          </form>
        </div>
        <ul className="comment-wrap list-unstyled">
          <li className="comment-item">
            <div className="d-flex position-relative">
              <div className="avatar avatar-xs">
                <Link href="#!">
                  <Avatar
                    className="avatar-img rounded-circle"
                    src="/05.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="ms-2">
                <div className="bg-light rounded-start-top-0 p-3 rounded">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1">
                      <Link href="#!"> Frances Guerrero </Link>
                    </h6>
                    <small className="ms-2">5hr</small>
                  </div>
                  <p className="small mb-0">
                    Removed demands expense account in outward tedious do.
                    Particular way thoroughly unaffected projection.
                  </p>
                </div>
                <ul className="nav nav-divider py-2 small">
                  <li className="nav-item">
                    <Link href="#!" className="nav-link">
                      Like (3)
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#!" className="nav-link">
                      Reply
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#!" className="nav-link">
                      View 5 replies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <ul className="comment-item-nested list-unstyled">
              <li className="comment-item">
                <div className="d-flex">
                  <div className="avatar avatar-xs">
                    <Link href="#!">
                      <Avatar
                        className="avatar-img rounded-circle"
                        src="/07.jpg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="ms-2">
                    <div className="bg-light p-3 rounded">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">
                          <Link href="#!"> Lori Stevens </Link>{" "}
                        </h6>
                        <small className="ms-2">2hr</small>
                      </div>
                      <p className="small mb-0">
                        See resolved goodness felicity shy civility domestic had
                        but Drawings offended yet answered Jennings perceive.
                      </p>
                    </div>
                    <ul className="nav nav-divider py-2 small">
                      <li className="nav-item">
                        <Link href="#!" className="nav-link">
                          Like (5)
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="#!" className="nav-link">
                          Reply
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="comment-item">
                <div className="d-flex">
                  <div className="avatar avatar-story avatar-xs">
                    <Link href="#!">
                      <Avatar
                        className="avatar-img rounded-circle"
                        src="/08.jpg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="ms-2">
                    <div className="bg-light p-3 rounded">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">
                          <Link href="#!"> Billy Vasquez </Link>{" "}
                        </h6>
                        <small className="ms-2">15min</small>
                      </div>
                      <p className="small mb-0">
                        Wishing calling is warrant settled was lucky.
                      </p>
                    </div>
                    <ul className="nav nav-divider py-2 small">
                      <li className="nav-item">
                        <Link href="#!" className="nav-link">
                          Like
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="#!" className="nav-link">
                          Reply
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <Link
              href="#!"
              role="button"
              className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center mb-3 ms-5"
              data-bs-toggle="button"
              aria-pressed="true"
            >
              <div className="spinner-dots me-2">
                <span className="spinner-dot"></span>
                <span className="spinner-dot"></span>
                <span className="spinner-dot"></span>
              </div>
              Load more replies
            </Link>
          </li>
          <li className="comment-item">
            <div className="d-flex">
              <div className="avatar avatar-xs">
                <Link href="#!">
                  <Avatar
                    className="avatar-img rounded-circle"
                    src="/09.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="ms-2">
                <div className="bg-light p-3 rounded">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1">
                      <Link href="#!"> Frances Guerrero </Link>{" "}
                    </h6>
                    <small className="ms-2">4min</small>
                  </div>
                  <p className="small mb-0">
                    Removed demands expense account in outward tedious do.
                    Particular way thoroughly unaffected projection.
                  </p>
                </div>
                <ul className="nav nav-divider pt-2 small">
                  <li className="nav-item">
                    <Link href="#!" className="nav-link">
                      Like (1)
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#!" className="nav-link">
                      Reply
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#!" className="nav-link">
                      View 6 replies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="card-footer border-0 pt-0">
        <Link
          href="#!"
          role="button"
          className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
          data-bs-toggle="button"
          aria-pressed="true"
        >
          <div className="spinner-dots me-2">
            <span className="spinner-dot"></span>
            <span className="spinner-dot"></span>
            <span className="spinner-dot"></span>
          </div>
          Load more comments
        </Link>
      </div>
    </div>
  );
}
