import Header from "../components/Header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ marginTop: "100px" }}>{children}</main>
    </>
  );
}
