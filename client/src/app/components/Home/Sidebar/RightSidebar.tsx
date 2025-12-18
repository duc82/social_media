import Link from "next/link";
import SpinnerDots from "../../SpinnerDots";
import userService from "@/app/services/userService";
import getServerSession from "@/app/libs/session";
import SuggestionItemSidebar from "./SuggestionItemSidebar";

export default async function RightSidebar() {
  const { token } = await getServerSession();
  const { friends } = await userService.getSuggestedFriends(token, {
    page: 1,
    limit: 5,
  });

  return (
    <div className="col-lg-3">
      <div className="sticky" style={{ top: "calc(56px + 1.5rem)" }}>
        <div className="row flex-nowrap flex-column justify-content-start">
          {friends.length > 0 && (
            <div className="col-sm-6 col-lg-12 flex-fill mb-4">
              <div className="card">
                <div className="card-header pb-0 border-0">
                  <h5 className="card-title mb-0">Who to follow</h5>
                </div>
                <div className="card-body">
                  {friends.map((friend) => (
                    <SuggestionItemSidebar key={friend.id} {...friend} />
                  ))}

                  <div className="d-grid mt-3">
                    <Link
                      className="btn btn-sm btn-primary-soft"
                      href="/friends/suggestions"
                    >
                      View more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-sm-6 col-lg-12 flex-fill">
            <div className="card h-100 overflow-y-auto">
              <div className="card-header pb-0 border-0">
                <h5 className="card-title mb-0">Today&apos;s news</h5>
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
    </div>
  );
}
