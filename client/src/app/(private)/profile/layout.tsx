import CreatePostModal from "@/app/components/Post/CreatePostModal";
import HeaderMainProfile from "@/app/components/Profile/Main/Header";
import Sidebar from "@/app/components/Profile/Sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CreatePostModal />
      <div className="row g-4">
        <div className="col-lg-8 vstack gap-4">
          <HeaderMainProfile />
          {children}
        </div>
        <Sidebar />
      </div>
    </>
  );
}
