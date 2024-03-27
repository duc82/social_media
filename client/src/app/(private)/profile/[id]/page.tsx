import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Posts from "@/app/components/Posts";
import SharePost from "@/app/components/Profile/Main/SharePost";
import PostProvider from "@/app/providers/PostProvider";
import postService from "@/app/services/postService";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getProfile = async (id?: string): Promise<FullUser> => {
  const session = await getServerSession(authOptions);

  const currentUser = session?.user! as FullUser;

  if (!id) {
    return currentUser;
  }

  if (session?.user.id === id) {
    return currentUser;
  }

  try {
    const user = await userService.getUserProfile(id);
    return user;
  } catch (error) {
    notFound();
  }
};

export default async function Profile({ params }: { params: { id?: string } }) {
  const user = await getProfile(params?.id);

  const { posts } = await postService.getAll({
    userId: user.id,
  });

  return (
    <PostProvider initialPosts={posts}>
      {params.id === user.id && <SharePost />}
      <Posts />
    </PostProvider>
  );
}
