"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import { CircleHalf, MoonStars, Sun } from "react-bootstrap-icons";

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
        <Sun />
      </button>
      <button
        type="button"
        className={clsx("btn", theme === "dark" && "btn-primary")}
        onClick={() => setTheme("dark")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Dark"
      >
        <MoonStars />
      </button>
      <button
        type="button"
        className={clsx("btn", theme === "system" && "btn-primary")}
        onClick={() => setTheme("system")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="System"
      >
        <CircleHalf />
      </button>
    </>
  );
}
