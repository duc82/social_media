"use client";

import { useTheme } from "next-themes";

const Home = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div>
      <ul>
        {themes.map((theme) => (
          <li key={theme}>
            <button type="button" onClick={() => setTheme(theme)}>
              {theme}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
