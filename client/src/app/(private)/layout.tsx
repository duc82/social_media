import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "../components/Header";
import SearchModal from "../components/Header/SearchModal";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <SearchModal accessToken={session?.accessToken!} />
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
