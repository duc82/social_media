import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Posts from "@/app/components/Posts";
import SharePost from "@/app/components/Profile/Main/SharePost";
import PostProvider from "@/app/providers/PostProvider";
import postService from "@/app/services/postService";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const posts = await postService.getMyPosts(session?.accessToken!);

  return (
    <PostProvider initialPosts={posts}>
      <SharePost />
      <Posts accessToken={session?.accessToken!} />
    </PostProvider>
  );
}
