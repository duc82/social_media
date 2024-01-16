import LeftSidebar from "@/app/components/Sidebar/Left";

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
