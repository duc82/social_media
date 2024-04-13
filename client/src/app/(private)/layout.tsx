import Header from "../components/Header";
import SearchModal from "../components/Header/SearchModal";

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SearchModal />
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
