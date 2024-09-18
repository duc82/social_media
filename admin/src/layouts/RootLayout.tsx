import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import clsx from "clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      <Navbar isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      <div
        className={clsx("navbar-overlay", isNavbarOpen && "show")}
        onClick={() => setIsNavbarOpen((prev) => !prev)}
      ></div>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
