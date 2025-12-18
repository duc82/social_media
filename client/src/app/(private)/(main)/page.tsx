import Stories from "@/app/components/Stories";
import SharePost from "@/app/components/Post/SharePost";
import RightSidebar from "@/app/components/Home/Sidebar/RightSidebar";
import LeftSidebar from "@/app/components/Home/Sidebar/LeftSidebar";
import getServerSession from "@/app/libs/session";
import postService from "@/app/services/postService";
import { PostProvider } from "@/app/providers/PostProvider";
import PostList from "@/app/components/Post/PostList";
import EditModal from "@/app/components/Post/EditModal";
import CreateStory from "@/app/components/Stories/CreateStory";
import userService from "@/app/services/userService";

export default async function Home() {
  const { currentUser, token } = await getServerSession();

  const [{ posts, limit, total }, { users: userStories }] = await Promise.all([
    postService.getAll(token),
    userService.getStories(token),
  ]);

  return (
    <div className="row g-4">
      <LeftSidebar totalPost={total} />

      <div className="col-md-8 col-lg-6 vstack gap-4">
        {/* Story */}
        <div className="d-flex gap-2 mb-n3">
          <CreateStory />

          <Stories initialUserStories={userStories} />
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
