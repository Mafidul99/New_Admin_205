import React from "react";
import { useThemeProvider } from "../utils/ThemeContext";

import { IoSunnyOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={currentTheme === "light"}
        onChange={() => changeCurrentTheme(currentTheme === "light" ? "dark" : "light")}
      />
      <label
        className="flex items-center justify-center cursor-pointer w-8 h-8 hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full"
        htmlFor="light-switch"
      >
        <IoSunnyOutline className="w-5 h-5 dark:hidden fill-current text-gray-600 dark:text-gray-400/80" />
        <MdDarkMode className="w-5 h-5 hidden dark:block fill-current text-gray-600 dark:text-slate-300/80" />
      </label>
    </div>
  );
}
