"use client";
import postService from "@/app/services/postService";
import { useSession } from "next-auth/react";
import { revalidateTag } from "@/app/actions/indexAction";
import { Post as IPost } from "@/app/types/post";
import Post from "../Post";

export default function Posts({ posts }: { posts: IPost[] }) {
  const { data } = useSession();

  const handleRemove = async (id: string) => {
    if (!data?.token) return;
    await postService.delete(id, data.token);
    revalidateTag("postProfile");
  };

  const handleLike = async (id: string) => {
    if (!data?.token) return;
    await postService.like(id, data.token);
    revalidateTag("postProfile");
  };

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          handleRemove={handleRemove}
          handleLike={handleLike}
          isLiked={post.likes.some((like) => like.id === data?.user.id)}
        />
      ))}
    </>
  );
}
