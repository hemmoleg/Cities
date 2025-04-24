import React, { useEffect, useState } from "react";
import { useCityStore } from "../store/cities";
import { AddCityPopup } from "./AddCityPopup";
import { ApiService } from "../services/ApiService";
import { City } from "../store/city";


export function CityList() {
  const { cities, setCities, markers} = useCityStore();
  const [selectedCity, setSelectedCapital] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cityToEdit, setCityToEdit] = useState<City | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedCities = await ApiService.fetchCities();
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error loading cities:", error);
      }
    })();

  }, [setCities]);

  const handleAddMarker = (cityId: number) => {
    const city = cities.find((city) => city.id === cityId);
    if (city) {
      (window as any).addMarkerToCity(city);
    }
  };

  const handleRemoveMarker = (cityId: number) => {
    const city = cities.find((city) => city.id === cityId);
    if (city) {
      (window as any).removeMarkerFromCity(city);
    }
  };  

  const handleRemoveCity = async (cityId: number) => {
    try {
      await ApiService.removeCity(cityId); 
      setCities(cities.filter((city) => city.id !== cityId));
    } catch (error) {
      console.error("Failed to remove city:", error);
    }
  };  

  const handleEditCity = (city: City) => {
    setCityToEdit(city);
    setIsPopupOpen(true);
  };

  return (
    <div className="w-xs overflow-auto p-4 pe-1">
      <h2 className="text-xl mb-2">Hauptstädte und Städte</h2>
      <ul>
        {cities.map((city) => (
          <React.Fragment key={city.id}>
            <li
              onClick={() =>
                setSelectedCapital((prev) => (prev === city.id ? null : city.id)) // Toggle the selected capital
              }
              className="cursor-pointer p-2 border-b hover:bg-gray-200"
            >
              {city.name} ({city.country})
              {selectedCity === city.id && (
              <div className="p-4  bg-gray-50 border cursor-default rounded shadow mb-2">
              {markers[city.id] ? (
                <button
                  className="cursor-pointer bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMarker(city.id)
                  }}
                >
                  Remove Marker
                </button>
              ) : (
                <button
                  className="cursor-pointer bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddMarker(city.id)
                  }}
                >
                  Add Marker
                </button>
              )}
              <button
                className="cursor-pointer block bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 mt-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditCity(city);
                }}
              >
                Edit City
              </button>
              <button
                className="cursor-pointer block bg-red-500 hover:bg-red-400 text-white px-4 py-2 mt-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveMarker(city.id);
                  handleRemoveCity(city.id);
                }}
              >
                Remove City
              </button>
            </div>
          )}
        </li>
      </React.Fragment>
    ))}
  </ul>

    {/* Circular Button */}
    <button
      className="absolute bottom-4 w-12 h-12 bg-blue-500 text-4xl text-white rounded-full hover:bg-blue-400 cursor-pointer"
      onClick={() => setIsPopupOpen(true)} // Open the popup
    >
      +
    </button>

    {/* Popup */}
    {isPopupOpen && (
      <AddCityPopup
      onClose={() => {
        setIsPopupOpen(false);
        setCityToEdit(null);
      }}
      city={cityToEdit}/>
    )}

</div>
);
}