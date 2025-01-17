import FriendSidebar from "@/app/components/Friends/Sidebar";
import { ReactNode } from "react";

export default function FriendsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="row">
      <FriendSidebar />
      <div className="col col-md-8 col-lg-9 gap-4">{children}</div>
    </div>
  );
}
