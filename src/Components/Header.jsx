import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import Wishlist from "../pages/Wishlist";

function Header({ wishlist, setWishlist }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

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

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const removeFromWishlist = (carId) => {
    const updatedWishlist = wishlist.filter((car) => car.id !== carId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <>
      <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md dark:bg-gray-900">
        <Link to="/">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Car Finder{" "}
          </h1>
        </Link>
        <div className="flex gap-7">
          <button
            onClick={toggleWishlist}
            className="dark:text-white cursor-pointer"
          >
            Wishlist
          </button>
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

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg dark:bg-gray-800 transition-transform transform ${
          isWishlistOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold dark:text-white">Your Wishlist</h2>
          <button
            onClick={toggleWishlist}
            className="mt-4 text-sm text-red-500 underline"
          >
            Close
          </button>
          <ul className="mt-4">
            {wishlist.length > 0 ? (
              wishlist.map((car) => (
                <Wishlist
                  key={car.id}
                  car={car}
                  onRemove={removeFromWishlist}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No items in wishlist.
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
