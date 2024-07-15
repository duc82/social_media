import AdminHeader from "@/app/components/Admin/AdminHeader";
import AdminSidebar from "@/app/components/Admin/AdminSidebar";
import getServerSession from "@/app/libs/session";
import { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const { currentUser } = await getServerSession();

  return (
    <div className="vh-100">
      <AdminHeader currentUser={currentUser} />
      {children}
    </div>
  );
}
