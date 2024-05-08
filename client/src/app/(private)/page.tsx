import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Stories from "../components/Stories";
import SharePost from "../components/Post/SharePost";
import RightSidebar from "../components/Home/Sidebar/RightSidebar";
import LeftSidebar from "../components/Home/Sidebar/LeftSidebar";

export default function Home() {
  return (
    <div className="row g-4">
      <LeftSidebar />

      <div className="col-md-8 col-lg-6 vstack gap-4">
        {/* Story */}
        <div className="d-flex gap-2 mb-n3">
          <div className="position-relative">
            <div
              className="card border border-2 border-dashed px-4 px-sm-5 shadow-none d-flex align-items-center justify-content-center text-center"
              style={{ height: "150px" }}
            >
              <div>
                <button
                  type="button"
                  className="stretched-link btn btn-light rounded-circle icon-md"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <h6 className="mt-2 mb-0 small">
                  Post a<br /> Story
                </h6>
              </div>
            </div>
          </div>

          <Stories />
        </div>
        {/* Share Post */}
        <SharePost />
        <ul>
          {[...Array(80)].map((_, i) => (
            <li key={i} className="mb-2">
              Item {i + 1}
            </li>
          ))}
        </ul>
      </div>

      <RightSidebar />
    </div>
  );
}
