import Link from "next/link";
import Avatar from "../../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";

export default function RightSidebar() {
  return (
    <div className="col-lg-3">
      <div className="row g-4">
        <div className="col-sm-6 col-lg-12">
          <div className="card">
            <div className="card-header pb-0 border-0">
              <h5 className="card-title mb-0">Who to follow</h5>
            </div>
            <div className="card-body">
              <div className="hstack gap-2 mb-3">
                <div className="avatar">
                  <Link href="#!">
                    <Avatar
                      className="avatar-img rounded-circle"
                      src="/01.jpg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="overflow-hidden">
                  <Link className="h6 mb-0" href="#!">
                    Judy Nguyen{" "}
                  </Link>
                  <p className="mb-0 small text-truncate">News anchor</p>
                </div>
                <Link
                  className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                  href="#"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
              <div className="hstack gap-2 mb-3">
                <div className="avatar avatar-story">
                  <Link href="#!">
                    <Avatar
                      className="avatar-img rounded-circle"
                      src="/01.jpg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="overflow-hidden">
                  <Link className="h6 mb-0" href="#!">
                    Amanda Reed{" "}
                  </Link>
                  <p className="mb-0 small text-truncate">Web Developer</p>
                </div>
                <Link
                  className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                  href="#"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>

              <div className="hstack gap-2 mb-3">
                <div className="avatar">
                  <Link href="#">
                    <Avatar
                      className="avatar-img rounded-circle"
                      src="/01.jpg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="overflow-hidden">
                  <Link className="h6 mb-0" href="#!">
                    Billy Vasquez{" "}
                  </Link>
                  <p className="mb-0 small text-truncate">News anchor</p>
                </div>
                <Link
                  className="btn btn-primary rounded-circle icon-md ms-auto"
                  href="#"
                >
                  <FontAwesomeIcon icon={faUserCheck} />
                </Link>
              </div>

              <div className="hstack gap-2 mb-3">
                <div className="avatar">
                  <Link href="#">
                    <Avatar
                      className="avatar-img rounded-circle"
                      src="/01.jpg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="overflow-hidden">
                  <Link className="h6 mb-0" href="#!">
                    Lori Ferguson{" "}
                  </Link>
                  <p className="mb-0 small text-truncate">
                    Web Developer at Webestica
                  </p>
                </div>
                <Link
                  className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                  href="#"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>

              <div className="hstack gap-2 mb-3">
                <div className="avatar">
                  <Link href="#">
                    <Avatar
                      className="avatar-img rounded-circle"
                      src="/01.jpg"
                      alt=""
                    />{" "}
                  </Link>
                </div>
                <div className="overflow-hidden">
                  <Link className="h6 mb-0" href="#!">
                    Carolyn Ortiz{" "}
                  </Link>
                  <p className="mb-0 small text-truncate">News anchor</p>
                </div>
                <Link
                  className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                  href="#"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>

              <div className="d-grid mt-3">
                <Link className="btn btn-sm btn-primary-soft" href="#!">
                  View more
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-12">
          <div className="card">
            <div className="card-header pb-0 border-0">
              <h5 className="card-title mb-0">Today's news</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link href="blog-details.html">
                    Ten questions you should answer truthfully
                  </Link>
                </h6>
                <small>2hr</small>
              </div>
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link href="blog-details.html">
                    Five unbelievable facts about money
                  </Link>
                </h6>
                <small>3hr</small>
              </div>
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link href="blog-details.html">
                    Best Pinterest Boards for learning about business
                  </Link>
                </h6>
                <small>4hr</small>
              </div>
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link href="blog-details.html">
                    Skills that you can learn from business
                  </Link>
                </h6>
                <small>6hr</small>
              </div>
              <button
                type="button"
                className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
                data-bs-toggle="button"
                aria-pressed="true"
              >
                <div className="spinner-dots me-2">
                  <span className="spinner-dot"></span>
                  <span className="spinner-dot"></span>
                  <span className="spinner-dot"></span>
                </div>
                View all latest news
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
