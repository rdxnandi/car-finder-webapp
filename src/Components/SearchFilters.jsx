import React, { useState } from "react";

const SearchFilters = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    fuel: "",
    seats: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="bg-white shadow rounded w-full border border-gray-200 justify-center dark:bg-gray-800 dark:border-gray-700">
      <form
        onSubmit={handleSubmit}
        className="p-6 mx-auto flex flex-col md:flex-row items-center gap-2"
      >
        <select
          name="brand"
          onChange={handleChange}
          className="w-full px-2 border border-gray-300 py-2 rounded focus:outline-none text-gray-500"
        >
          <option value="">Brand</option>
          <option>Toyota</option>
          <option>Honda</option>
          <option>Ford</option>
          <option>Audi</option>
          <option>Hyundai</option>
          <option>Opel</option>
          <option>Tata Motors</option>
        </select>

        <select
          name="fuel"
          onChange={handleChange}
          className="w-full px-2 border border-gray-300 py-2 rounded focus:outline-none text-gray-500"
        >
          <option value="">Fuel Type</option>
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
        </select>

        <select
          name="seats"
          onChange={handleChange}
          className="w-full px-2 border border-gray-300 py-2 rounded focus:outline-none text-gray-500"
        >
          <option value="">Seats</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="5">7</option>
        </select>

        <div className="flex gap-2 w-full">
          <input
            name="minPrice"
            type="number"
            placeholder="Min"
            onChange={handleChange}
            className="input w-1/2 px-2 border border-gray-300 py-2 rounded focus:outline-none"
          />
          <input
            name="maxPrice"
            type="number"
            placeholder="Max"
            onChange={handleChange}
            className="input w-1/2 px-2 border border-gray-300 py-2 rounded focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;
