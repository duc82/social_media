import { getUserProfile } from "@/app/actions/userAction";
import EditModal from "@/app/components/Post/EditModal";
import PostList from "@/app/components/Post/PostList";
import SharePost from "@/app/components/Post/SharePost";
import getServerSession from "@/app/libs/session";
import { PostProvider } from "@/app/providers/PostProvider";
import postService from "@/app/services/postService";

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { currentUser, token } = await getServerSession();
  let { username } = await params;

  username = username.replace(/%40/g, "");

  const user = await getUserProfile(username, currentUser, token);
  const { posts, limit, total } = await postService.getByUserId(user.id, token);

  const isMyProfile = currentUser.id === user.id;

  return (
    <PostProvider initialPosts={posts}>
      {isMyProfile && <SharePost currentUser={currentUser} />}
      {isMyProfile && <EditModal />}
      <PostList
        limit={limit}
        total={total}
        token={token}
        user={user}
        currentUser={currentUser}
      />
    </PostProvider>
  );
}
