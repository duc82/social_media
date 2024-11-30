import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import useResize from "@/hooks/useResize";
import clsx from "clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const width = useResize();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isXl = width >= 1200;

  return (
    <>
      <Header
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <Navbar
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isXl={isXl}
      />

      {!isXl && (
        <div
          className={clsx("navbar-overlay", isNavbarOpen && "show")}
          onClick={() => setIsNavbarOpen((prev) => !prev)}
        ></div>
      )}

      <main
        className={clsx(
          "main",
          isSidebarCollapsed && "navbar-vertical-collapsed"
        )}
      >
        <Outlet />
      </main>
    </>
  );
}
