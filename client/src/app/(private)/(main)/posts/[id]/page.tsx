import getServerSession from "@/app/libs/session";
import postService from "@/app/services/postService";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { token } = await getServerSession();
  const post = await postService.getById(id, token);

  console.log(post);

  return <div>Post Detail</div>;
}
