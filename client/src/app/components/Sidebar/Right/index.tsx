import Link from "next/link";
import Avatar from "../../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import SpinnerDots from "../../SpinnerDots";
import clsx from "clsx";

export default function RightSidebar() {
  const users = [
    {
      id: 1,
      name: "Judy Nguyen",
      bio: "News anchor",
      avatar: "/07.jpg",
      isSendRequest: false
    },
    {
      id: 2,
      name: "Amanda Reed",
      bio: "Web Developer at Webestica",
      avatar: "/07.jpg",
      isSendRequest: false
    },
    {
      id: 3,
      name: "Billy Vasquez",
      bio: "News anchor",
      avatar: "/07.jpg",
      isSendRequest: true
    },
    {
      id: 4,
      name: "Lori Ferguson",
      bio: "Web Developer at Webestica",
      avatar: "/07.jpg",
      isSendRequest: false
    },
    {
      id: 5,
      name: "Carolyn Ortiz",
      bio: "News anchor",
      avatar: "/07.jpg",
      isSendRequest: false
    }
  ];

  return (
    <div className="col-lg-3">
      <div className="row g-4 flex-nowrap flex-column justify-content-start">
        <div className="col-sm-6 col-lg-12 flex-fill">
          <div className="card">
            <div className="card-header pb-0 border-0">
              <h5 className="card-title mb-0">Who to follow</h5>
            </div>
            <div className="card-body">
              {users.map((user) => (
                <div key={user.id} className="hstack gap-2 mb-3">
                  <div className="avatar">
                    <Link href="#!">
                      <Avatar
                        className="avatar-img rounded-circle"
                        src={user.avatar}
                        alt={user.name}
                      />
                    </Link>
                  </div>
                  <div className="overflow-hidden">
                    <Link className="h6 mb-0 text-truncate" href="#!">
                      {user.name}
                    </Link>
                    <p className="mb-0 small text-truncate">{user.bio}</p>
                  </div>
                  <button
                    type="button"
                    className={clsx(
                      "btn rounded-circle icon-md ms-auto",
                      user.isSendRequest ? "btn-primary" : "btn-primary-soft"
                    )}
                  >
                    <FontAwesomeIcon
                      icon={user.isSendRequest ? faUserCheck : faPlus}
                    />
                  </button>
                </div>
              ))}

              <div className="d-grid mt-3">
                <Link className="btn btn-sm btn-primary-soft" href="#!">
                  View more
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-12 flex-fill">
          <div className="card h-100 overflow-y-auto">
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
                className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center p-0"
                data-bs-toggle="button"
                aria-pressed="true"
              >
                <SpinnerDots className="me-2" />
                <span>View all latest news</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
