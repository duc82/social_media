import { createContext } from "react";
import { Post } from "../types/post";

interface PostState {
  posts: Post[];
  addPost: (_post: Post) => void;
  removePost: (_id: string) => void;
}

const PostContext = createContext<PostState>({
  posts: [],
  addPost: () => {},
  removePost: () => {},
});

export default PostContext;
