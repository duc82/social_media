"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import { CircleHalf, MoonStarsFill, SunFill } from "react-bootstrap-icons";

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
        <SunFill />
      </button>
      <button
        type="button"
        className={clsx("btn", theme === "dark" && "btn-primary")}
        onClick={() => setTheme("dark")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Dark"
      >
        <MoonStarsFill />
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
