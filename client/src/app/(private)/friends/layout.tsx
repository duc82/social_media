import FriendSidebar from "@/app/components/Friends/Sidebar";

export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="row">
      <FriendSidebar />
      <div className="col col-md-8 col-lg-9 gap-4">{children}</div>
    </div>
  );
}
