import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import useResize from "@/hooks/useResize";
import clsx from "clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const width = useResize();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarMini, setIsNavbarMini] = useState(false);

  const isXl = width >= 1200;

  return (
    <>
      <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />

      <Navbar isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />

      {!isXl && (
        <div
          className={clsx("navbar-overlay", isNavbarOpen && "show")}
          onClick={() => setIsNavbarOpen((prev) => !prev)}
        ></div>
      )}
      <main
        className={clsx("main", !isNavbarOpen && "navbar-vertical-collapsed")}
      >
        <Outlet />
      </main>
    </>
  );
}
