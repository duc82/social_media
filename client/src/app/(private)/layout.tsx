import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/Header"), { ssr: false });

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
