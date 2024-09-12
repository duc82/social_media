import AdminNavbar from "@/app/components/Admin/AdminNavbar";
import AdminSidebar from "@/app/components/Admin/AdminSidebar";
import getServerSession from "@/app/libs/session";
import { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const { currentUser } = await getServerSession();

  return (
    <div className="d-flex w-100">
      <AdminSidebar currentUser={currentUser} />
      <main className="w-100">
        <AdminNavbar />

        {children}
      </main>
    </div>
  );
}
