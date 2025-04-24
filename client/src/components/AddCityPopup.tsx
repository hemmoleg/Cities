import React, { useEffect, useState } from "react";
import { ApiService } from "../services/ApiService";
import { useCityStore } from "../store/cities";
import { City } from "../store/city";
import mapboxgl from "mapbox-gl";

interface AddCityPopupProps {
  onClose: () => void; 
  city: City | null;
}

export function AddCityPopup({ onClose, city }: AddCityPopupProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { cities, setCities, markers, addMarker, removeMarker} = useCityStore();

  useEffect(() => {
    if (city) {
      setName(city.name);
      setCountry(city.country);
      setLatitude(city.latitude.toString());
      setLongitude(city.longitude.toString());
    }
  }, [city]);


  useEffect(() => {
    if(city)
      console.log("loglog:", cities.find(c => c.id === city.id));
  }, [cities]);

  const isFormValid =
    name.trim() !== "" &&
    country.trim() !== "" &&
    !isNaN(parseFloat(latitude)) &&
    !isNaN(parseFloat(longitude));

  const handleSubmit =  async () => {
    const updatedCity = {
      name,
      country,
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    };

    console.log("New City:", updatedCity); 
  
    try {
      if (city) {
        // Update existing city
        const savedCity = await ApiService.updateCity(city.id, updatedCity);
        console.log("Saved City:", savedCity); // Log the saved city
        //setCities(cities.map(c => c.id === savedCity.id ? savedCity : c));

        let ccc = cities.map(c => c.id === savedCity.id ? savedCity : c)

        console.log("ccc:", ccc.find(c => c.id === savedCity.id)); // Log the updated city
        setCities(ccc);

        // setCities(
        //   cities.map((c) => (c.id === city.id ? { ...c, ...updatedCity } : c))
        // );

        if (markers[city.id]) {
          let marker = markers[city.id];
          removeMarker(city.id);
          addMarker(city.id, marker);
          
          // markers[city.id]
          //   .setLngLat([updatedCity.longitude, updatedCity.latitude])
        }
      } else {
        const city = await ApiService.addCity(updatedCity);
        setCities([...cities,city]);
      } 
      onClose();
    } catch (err) {
      console.error("Failed to add city. Please try again.");
    }
  
  };

  return (
    <div className="z-1 fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">
          {city ? ('Edit City') : ('Add new City')}
        </h2>
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
            {city ? ('Edit') : ('Add')}
          </button>
        </div>
      </div>
    </div>
  );
}