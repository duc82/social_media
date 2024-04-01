"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import { CircleHalf, MoonStars, Sun } from "react-bootstrap-icons";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
  };

  return (
    <>
      <button
        type="button"
        className={clsx("btn", theme === "light" && "btn-primary")}
        onClick={() => handleChangeTheme("light")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Light"
      >
        <Sun />
      </button>
      <button
        type="button"
        className={clsx("btn", theme === "dark" && "btn-primary")}
        onClick={() => handleChangeTheme("dark")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Dark"
      >
        <MoonStars />
      </button>
      <button
        type="button"
        className={clsx("btn", theme === "system" && "btn-primary")}
        onClick={() => handleChangeTheme("system")}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="System"
      >
        <CircleHalf />
      </button>
    </>
  );
}
