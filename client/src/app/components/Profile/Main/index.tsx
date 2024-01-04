import Post from "../../Post";
import HeaderMainProfile from "./Header";
import ShareFeed from "./ShareFeed";

export default function Main() {
  return (
    <div className="col-lg-8 vstack gap-4">
      <HeaderMainProfile />
      <ShareFeed />

      {[...Array(10)].map((_, i) => (
        <Post />
      ))}
    </div>
  );
}
