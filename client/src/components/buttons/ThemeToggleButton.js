import React from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import { ReactComponent as MoonIcon } from "../../assets/moon-icon.svg";
import { ReactComponent as SunIcon } from "../../assets/sun-icon.svg";

const ThemeToggleButton = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleTheme = () => setDarkTheme(!darkTheme);

  return (
    <button className="theme__button" onClick={handleTheme}>
      {darkTheme ? (
        <>
          <SunIcon />
          Light mode
        </>
      ) : (
        <>
          <MoonIcon />
          Dark mode
        </>
      )}
    </button>
  );
};

export default ThemeToggleButton;
