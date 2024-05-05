import profileAction from "@/app/actions/profileAction";
import userAction from "@/app/actions/userAction";
import SharePost from "@/app/components/Post/SharePost";
import Posts from "@/app/components/Posts";
import PostProvider from "@/app/providers/PostProvider";
import postService from "@/app/services/postService";

export default async function Profile({ params }: { params: { id?: string } }) {
  const session = await userAction.getServerSession();
  const currentUser = await userAction.getCurrentUser(session);
  const user = await profileAction.getById(params.id, currentUser);

  const { posts } = await postService.getAll({
    userId: user.id,
  });

  const isMyProfile = currentUser.id === user.id;

  return (
    <PostProvider initialPosts={posts}>
      {isMyProfile && <SharePost />}
      <Posts />
    </PostProvider>
  );
}
