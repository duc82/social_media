import { create } from "zustand";
import { Post } from "../types/post";

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  removePost: (id: string) => void;
}

const usePosts = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  removePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
}));

export default usePosts;
