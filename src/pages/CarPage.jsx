import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";

function CarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://67f8e902094de2fe6e9fb486.mockapi.io/api/v1/cars/${id}`
        );
        setCar(response.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Car not found or failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <div className="p-4 dark:text-gray-400">Loading...</div>;
  if (error || !car) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="h-screen relative p-4 md:p-0">
      <div className="max-w-3xl mx-auto p-4 border border-gray-500 mt-5 rounded">
        <button
          onClick={() => navigate(-1)}
          className="text-white rounded absolute left-3 top-1 cursor-pointer"
        >
          <IoIosArrowRoundBack size={28} />
        </button>
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-2xl font-bold mb-2 dark:text-gray-400">
          {car.brand} {car.model}
        </h1>
        <p className="text-gray-700 mb-1 dark:text-gray-300">
          Price: ${car.price}
        </p>
        <p className="text-gray-700 mb-1 dark:text-gray-300">
          Fuel Type: {car.fuelType}
        </p>
        <p className="text-gray-700 mb-1 dark:text-gray-300">
          Seating Capacity: {car.seatingCapacity}
        </p>
        <p className="text-gray-700 mb-4 dark:text-gray-300">
          {car.description}
        </p>
      </div>
    </div>
  );
}

export default CarPage;
