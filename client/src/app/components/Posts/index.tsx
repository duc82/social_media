"use client";
import Post from "../Post";
import postService from "@/app/services/postService";
import usePosts from "@/app/hooks/usePosts";

export default function Posts({ accessToken }: { accessToken: string }) {
  const { posts, removePost, setPosts } = usePosts((state) => state);

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
