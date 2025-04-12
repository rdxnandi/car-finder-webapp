import React from "react";

function Wishlist({ car, onRemove }) {
  return (
    <li className="text-gray-700 dark:text-gray-300 mb-2 border-b pb-2">
      <p className="font-bold">
        {car.brand} {car.model}
      </p>
      <p>${car.price}</p>
      <p>
        {car.fuelType} | {car.seatingCapacity} Seats
      </p>
      {onRemove && (
        <button
          onClick={() => onRemove(car.id)}
          className="mt-2 text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      )}
    </li>
  );
}

export default Wishlist;
