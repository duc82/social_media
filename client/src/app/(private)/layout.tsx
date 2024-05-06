import Header from "../components/Header";
import SocketProvider from "../providers/SocketProvider";

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </SocketProvider>
  );
}
