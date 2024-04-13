import { useContext } from "react";
import PostContext from "../contexts/PostContext";

export default function usePost() {
  return useContext(PostContext);
}
