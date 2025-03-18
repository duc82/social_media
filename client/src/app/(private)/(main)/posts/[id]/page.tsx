import { getPostById } from "@/app/actions/postAction";
import LeftSidebar from "@/app/components/Home/Sidebar/LeftSidebar";
import RightSidebar from "@/app/components/Home/Sidebar/RightSidebar";
import PostDetail from "@/app/components/Post/PostDetail";
import getServerSession from "@/app/libs/session";
import { PostProvider } from "@/app/providers/PostProvider";
import postService from "@/app/services/postService";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, { token, currentUser }] = await Promise.all([
    await params,
    await getServerSession(),
  ]);

  const [post, totalPost] = await Promise.all([
    getPostById(id),
    postService.count(token),
  ]);

  return (
    <div className="row g-4">
      <LeftSidebar totalPost={totalPost} />
      <div className="col-md-8 col-lg-6">
        <PostProvider initialPosts={[post]}>
          <PostDetail currentUser={currentUser} />
        </PostProvider>
      </div>
      <RightSidebar />
    </div>
  );
}
