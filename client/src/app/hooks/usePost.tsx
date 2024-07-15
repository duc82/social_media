import { useContext } from "react";
import { PostContext } from "../providers/PostProvider";

export default function usePost() {
  return useContext(PostContext);
}
