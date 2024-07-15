"use client";
import { ReactNode, createContext, useState } from "react";
import { Post } from "../types/post";

interface PostState {
  posts: Post[];
  addPost: (_post: Post) => void;
  removePost: (_id: string) => void;
}

export const PostContext = createContext<PostState>({
  posts: [],
  addPost: () => {},
  removePost: () => {},
});

export function PostProvider({
  children,
  initialPosts,
}: {
  children: ReactNode;
  initialPosts: Post[];
}) {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const removePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, removePost }}>
      {children}
    </PostContext.Provider>
  );
}
