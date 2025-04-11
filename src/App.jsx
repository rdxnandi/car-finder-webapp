import React, { useState } from "react";
import Home from "./pages/Home";
import CarPage from "./pages/CarPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  const [wishlist, setWishlist] = useState([]);

  const handleAddToWishlist = (car) => {
    if (!wishlist.some((item) => item.id === car.id)) {
      setWishlist((prev) => [...prev, car]);
    }
  };
  return (
    <BrowserRouter>
      <Header wishlist={wishlist} />
      <Routes>
        <Route
          path="/"
          element={<Home onAddToWishlist={handleAddToWishlist} />}
        />
        <Route path="/car/:id" element={<CarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
