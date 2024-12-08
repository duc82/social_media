"use client";
import postService from "@/app/services/postService";
import InfiniteScroll from "observer-infinite-scroll";
import { useState } from "react";
import { FullUser } from "@/app/types/user";
import PostItem from "./PostItem";
import usePostContext from "@/app/hooks/usePostContext";

interface PostsProps {
  user?: FullUser;
  token: string;
  total: number;
  limit: number;
  currentUser: FullUser;
}

export default function PostList({
  limit,
  total,
  token,
  user,
  currentUser,
}: PostsProps) {
  const { posts, setPosts } = usePostContext();
  const [hasMore, setHasMore] = useState<boolean>(total > limit);
  const [page, setPage] = useState<number>(1);

  const fetchMorePosts = async (): Promise<void> => {
    try {
      const newPage = page + 1;
      const data = await postService.getByUserId(
        user?.id || currentUser.id,
        token,
        {
          page: newPage,
          limit,
        }
      );

      if (data.posts.length === 0) {
        setHasMore(false);
        return;
      }

      setPage(newPage);
      setPosts((prev) => [...prev, ...data.posts]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InfiniteScroll
      hasMore={hasMore}
      fetchMore={fetchMorePosts}
      className="vstack gap-4"
      loader={
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      endMessage={<></>}
    >
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} currentUser={currentUser} />;
      })}
    </InfiniteScroll>
  );
}
