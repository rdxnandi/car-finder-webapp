import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchFilters from "../Components/SearchFilters";
import CarCard from "../Components/CarCard";

function Home({ onAddToWishlist }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("");

  const fetchCars = async (filters = {}, page = 1) => {
    setLoading(true);
    setError("");
    try {
      const baseUrl = `${String(import.meta.env.VITE_API_BASE_URL)}/cars`;
      console.log(baseUrl);
      const response = await axios.get(baseUrl);
      let results = response.data;

      if (filters.brand) {
        results = results.filter((car) => car.brand === filters.brand);
      }
      if (filters.fuel) {
        results = results.filter((car) => car.fuelType === filters.fuel);
      }
      if (filters.minPrice) {
        results = results.filter(
          (car) => car.price >= parseInt(filters.minPrice)
        );
      }
      if (filters.maxPrice) {
        results = results.filter(
          (car) => car.price <= parseInt(filters.maxPrice)
        );
      }
      if (filters.seats) {
        results = results.filter(
          (car) => car.seatingCapacity === parseInt(filters.seats)
        );
      }

      if (sortOption === "priceHighToLow") {
        results.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceLowToHigh") {
        results.sort((a, b) => b.price - a.price);
      }

      const start = (page - 1) * 10;
      const paginated = results.slice(start, start + 10);

      setCars(paginated);
      setTotal(results.length);
    } catch (err) {
      setCars([]);
      setTotal(0);
      setError("Failed to fetch data from MockAPI.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(filters, page);
  }, [page, filters]);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    setPage(1);
    fetchCars(searchFilters, 1);
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-400">
        Find Your Dream Car
      </h1>
      <SearchFilters onSearch={handleSearch} />

      <div className="flex justify-end my-4">
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            fetchCars(filters, page);
          }}
          className="border px-3 py-2 rounded focus:outline-none text-gray-500"
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center mt-4 dark:text-gray-400">Loading cars...</p>
      ) : error ? (
        <p className="text-red-600 text-center mt-4">{error}</p>
      ) : (
        <div>
          <div className="flex flex-wrap gap-4 mt-6">
            {cars && Array.isArray(cars) && cars.length > 0 ? (
              cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onAddToWishlist={onAddToWishlist}
                />
              ))
            ) : (
              <p className="text-gray-500">Invalid data</p>
            )}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  page === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
