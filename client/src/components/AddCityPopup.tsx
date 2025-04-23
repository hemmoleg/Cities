import React, { useState } from "react";
import { ApiService } from "../services/ApiService";

interface AddCityPopupProps {
  onClose: () => void; // Function to close the popup
}

export function AddCityPopup({ onClose }: AddCityPopupProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Check if all fields are valid
  const isFormValid =
    name.trim() !== "" &&
    country.trim() !== "" &&
    !isNaN(parseFloat(latitude)) &&
    !isNaN(parseFloat(longitude));

  const handleSubmit =  async () => {
    const newCity = {
      name,
      country,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    console.log("New City:", newCity); // For debugging
    //onClose(); // Close the popup after submission
  
    try {
      await ApiService.addCity(newCity); // Call the API to add the city
      onClose(); // Close the popup after successful submission
    } catch (err) {
      console.error("Failed to add city. Please try again."); // Handle errors
    }
  
  };

  return (
    <div className="z-1 fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Add New City</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 cursor-pointer hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${
              isFormValid
                ? "bg-blue-500 text-white cursor-pointer hover:bg-blue-400"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid} // Disable button if form is invalid
          >
            Add City
          </button>
        </div>
      </div>
    </div>
  );
}