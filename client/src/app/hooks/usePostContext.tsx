import { useContext } from "react";
import { PostContext } from "../providers/PostProvider";

export default function usePostContext() {
  return useContext(PostContext);
}
