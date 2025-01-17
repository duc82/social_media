"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Post } from "../types/post";

interface PostContextProps {
  post: Post | null;
  posts: Post[];
  updatePost: (_post: Post) => void;
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

export const PostContext = createContext<PostContextProps>({
  post: null,
  posts: [],
  updatePost: () => {},
  setPosts: () => {},
});

interface PostProviderProps extends PropsWithChildren {
  initialPosts: Post[];
}

export const PostProvider = ({ children, initialPosts }: PostProviderProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const updatePost = (post: Post) => {
    setPost(post);
  };

  return (
    <PostContext.Provider
      value={{
        post,
        posts,
        updatePost,
        setPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
