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
        <div className="flex flex-wrap gap-4">
          {wishlist.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isInWishlist={true}
              onAddToWishlist={() => removeFromWishlist(car.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
