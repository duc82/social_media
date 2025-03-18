"use client";
import usePostContext from "@/app/hooks/usePostContext";
import PostItem from "./PostItem";
import { FullUser } from "@/app/types/user";

export default function PostDetail({ currentUser }: { currentUser: FullUser }) {
  const { posts } = usePostContext();
  return <PostItem post={posts[0]} currentUser={currentUser} />;
}
