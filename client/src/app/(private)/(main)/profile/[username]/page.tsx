import { getUserProfile } from "@/app/actions/userAction";
import SharePost from "@/app/components/Post/SharePost";
import Posts from "@/app/components/Posts";
import getServerSession from "@/app/libs/session";
import postService from "@/app/services/postService";

export default async function Profile({
  params,
}: {
  params: { username?: string };
}) {
  const { currentUser, token } = await getServerSession();

  const username = params.username?.replace("%40", "");

  const user = await getUserProfile(username, currentUser, token);

  const { posts } = await postService.getAll({
    userId: user.id,
    tags: ["postProfile"],
  });

  const isMyProfile = currentUser.id === user.id;

  return (
    <>
      {isMyProfile && <SharePost />}
      <Posts posts={posts} />
    </>
  );
}
