"use client";
import usePost from "@/app/hooks/usePost";
import Post from "../Post";
import postService from "@/app/services/postService";
import { useSession } from "next-auth/react";

export default function Posts() {
  const { posts, removePost } = usePost();
  const { data } = useSession();

  const handleDeletePost = async (id: string) => {
    if (!data?.accessToken) return;
    await postService.delete(id, data.accessToken);
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
