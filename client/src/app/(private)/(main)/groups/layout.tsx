import LeftSidebar from "@/app/components/Home/Sidebar/LeftSidebar";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="row g-4">
      <LeftSidebar />
      {children}
    </div>
  );
}
