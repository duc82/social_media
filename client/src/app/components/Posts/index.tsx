"use client";
import usePost from "@/app/hooks/usePost";
import Post from "../Post";
import postService from "@/app/services/postService";

export default function Posts({ accessToken }: { accessToken: string }) {
  const { posts, removePost } = usePost();

  const handleDeletePost = async (id: string) => {
    await postService.delete(id, accessToken);
    removePost(id);
  };

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} handleDeletePost={handleDeletePost} />
      ))}
    </>
  );
}
