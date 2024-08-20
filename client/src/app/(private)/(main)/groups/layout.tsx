import LeftSidebar from "@/app/components/Home/Sidebar/LeftSidebar";
import { ReactNode } from "react";

export default function GroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="row g-4">
      <LeftSidebar />
      {children}
    </div>
  );
}
