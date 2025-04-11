import React from "react";
import { Link } from "react-router-dom";

function CarCard({ car, onAddToWishlist }) {
  return (
    <div className="rounded shadow-md border border-gray-200 p-4 w-full sm:w-[30%] bg-white dark:bg-gray-800 dark:border-gray-700">
      <img
        src={car.image}
        alt={car.model}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="text-lg font-bold dark:text-gray-300">
        {car.brand} {car.model}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        ${car.price} | {car.fuelType} | {car.seatingCapacity} Seats
      </p>
      <div className="flex justify-between items-center mt-2">
        <Link
          to={`/car/${car.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Details
        </Link>
        <button
          onClick={() => onAddToWishlist(car)}
          className="text-sm text-red-600 hover:underline"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

export default CarCard;
