import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Stories from "@/app/components/Stories";
import SharePost from "@/app/components/Post/SharePost";
import RightSidebar from "@/app/components/Home/Sidebar/RightSidebar";
import LeftSidebar from "@/app/components/Home/Sidebar/LeftSidebar";
import getServerSession from "@/app/libs/session";
import postService from "@/app/services/postService";
import { PostProvider } from "@/app/providers/PostProvider";
import PostList from "@/app/components/Post/PostList";
import EditModal from "@/app/components/Post/EditModal";
import Link from "next/link";

export default async function Home() {
  const { currentUser, token } = await getServerSession();

  const { posts, limit, total } = await postService.getAll(token);

  return (
    <div className="row g-4">
      <LeftSidebar totalPost={total} />

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

        <PostProvider initialPosts={posts}>
          <SharePost currentUser={currentUser} />
          <EditModal />
          <PostList
            limit={limit}
            total={total}
            token={token}
            currentUser={currentUser}
          />
        </PostProvider>
      </div>

      <RightSidebar />
    </div>
  );
}
