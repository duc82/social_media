import LeftSidebar from "@/app/components/Home/Sidebar/LeftSidebar";
import getServerSession from "@/app/libs/session";
import postService from "@/app/services/postService";
import { PropsWithChildren } from "react";

export default async function layout({ children }: PropsWithChildren) {
  const { token } = await getServerSession();
  const { total } = await postService.getAll(token);

  return (
    <div className="row g-4">
      <LeftSidebar totalPost={total} />
      {children}
    </div>
  );
}
