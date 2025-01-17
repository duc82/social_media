"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        type="button"
        className={clsx("btn", theme === "light" && "btn-primary")}
        onClick={() => setTheme("light")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Light"
      >
        <i className="bi bi-sun-fill"></i>
      </button>
      <button
        type="button"
        className={clsx("btn", theme === "dark" && "btn-primary")}
        onClick={() => setTheme("dark")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Dark"
      >
        <i className="bi bi-moon-stars-fill"></i>
      </button>
      <button
        type="button"
        className={clsx("btn", theme === "system" && "btn-primary")}
        onClick={() => setTheme("system")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="System"
      >
        <i className="bi bi-circle-half"></i>
      </button>
    </>
  );
}
