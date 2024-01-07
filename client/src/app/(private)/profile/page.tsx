import Post from "@/app/components/Post";
import SharePost from "@/app/components/Profile/Main/SharePost";

export default function Profile() {
  return (
    <>
      <SharePost />

      {[...Array(10)].map((_, i) => (
        <Post key={i} />
      ))}
    </>
  );
}
