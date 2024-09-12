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
  params: { username?: string };
}) {
  const { currentUser, token } = await getServerSession();

  const username = params.username?.replace("%40", "");

  const [user, { posts, limit, total }] = await Promise.all([
    getUserProfile(username, currentUser, token),
    postService.getCurrent(token),
  ]);

  const isMyProfile = currentUser.id === user.id;

  return (
    <PostProvider initialPosts={posts}>
      {isMyProfile && <SharePost currentUser={currentUser} />}
      {isMyProfile && <EditModal />}
      <PostList
        limit={limit}
        total={total}
        token={token}
        currentUser={currentUser}
      />
    </PostProvider>
  );
}
