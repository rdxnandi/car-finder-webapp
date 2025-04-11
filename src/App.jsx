import React from "react";
import Home from "./pages/Home";
import CarPage from "./pages/CarPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
