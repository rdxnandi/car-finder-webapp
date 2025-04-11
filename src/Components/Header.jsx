import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md dark:bg-gray-900">
      <Link to="/">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Car Finder{" "}
        </h1>
      </Link>
      <div className="flex gap-7">
        <button className="text-white cursor-pointer">Wishlist</button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 transition cursor-pointer"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <MdLightMode size={20} className="text-yellow-500" />
          ) : (
            <MdDarkMode size={20} className="text-gray-800" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
