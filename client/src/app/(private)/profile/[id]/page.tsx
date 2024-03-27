import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Posts from "@/app/components/Posts";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import SharePost from "@/app/components/Profile/Main/SharePost";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import PostProvider from "@/app/providers/PostProvider";
import postService from "@/app/services/postService";
import userService from "@/app/services/userService";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getProfile = async (id: string) => {
  try {
    const user = await userService.getUserProfile(id);
    return user;
  } catch (error) {
    notFound();
  }
};

export default async function Profile({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const session = await getServerSession(authOptions);

  const user = await getProfile(searchParams.id || session?.user.id!);

  const { posts } = await postService.getAll({
    userId: user.id,
  });

  return (
    <PostProvider initialPosts={posts}>
      {searchParams.id === session?.user.id && <SharePost />}
      <Posts accessToken={session?.accessToken!} />
    </PostProvider>
  );
}
