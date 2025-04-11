import React from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const removeFromWishlist = (carId) => {
    const updated = wishlist.filter((car) => car.id !== carId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">No cars in your wishlist.</p>
      ) : (
        <div className="flex gap-4">
          {wishlist.map((car) => (
            <div
              key={car.id}
              className="rounded shadow-md border border-gray-200 p-4 w-full sm:w-[30%] bg-white dark:bg-gray-800 dark:border-gray-700"
            >
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
              <button
                onClick={() => removeFromWishlist(car.id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
