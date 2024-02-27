import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Posts from "@/app/components/Posts";
import SharePost from "@/app/components/Profile/Main/SharePost";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <SharePost />
      <Posts accessToken={session?.accessToken!} />
    </>
  );
}
