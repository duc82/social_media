import profileAction from "@/app/actions/profileAction";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SharePost from "@/app/components/Post/SharePost";
import Posts from "@/app/components/Posts";
import PostProvider from "@/app/providers/PostProvider";
import postService from "@/app/services/postService";
import { FullUser } from "@/app/types/user";
import { getServerSession } from "next-auth";

export default async function Profile({ params }: { params: { id?: string } }) {
  // const session = await getServerSession(authOptions);
  // const currentUser = session?.user as FullUser;
  // const user = await profileAction.getById(params.id, currentUser);

  // const { posts } = await postService.getAll({
  //   userId: user.id,
  // });

  return (
    <PostProvider initialPosts={[]}>
      <SharePost />
      <Posts />
    </PostProvider>
  );
}
