import React, { useEffect, useState } from "react";
import { useCityStore } from "../store/cities";
import { AddCityPopup } from "./AddCityPopup";
import { ApiService } from "../services/ApiService";
import { City } from "../store/city";


export function CityList() {
  const { cities, setCities, markers, removeMarker} = useCityStore();
  const [selectedCity, setSelectedCapital] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cityToEdit, setCityToEdit] = useState<City | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedCities = await ApiService.fetchCities();
        fetchedCities.sort((a, b) => a.name.localeCompare(b.name));
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
    markers[cityId].remove();
    removeMarker(cityId);
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
              className="cursor-pointer p-2 border-b border-b-gray-400 hover:bg-gray-200 transition-all"
            >
              {city.name} ({city.country})
              {selectedCity === city.id && (
              <div className="p-4  bg-gray-50 border cursor-default rounded shadow mb-2">
              {markers[city.id] ? (
                <button
                  className="btn btn-red"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMarker(city.id)
                  }}
                >
                  Remove Marker
                </button>
              ) : (
                <button
                  className="btn btn-blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddMarker(city.id)
                  }}
                >
                  Add Marker
                </button>
              )}
              <button
                className="btn btn-blue btn-block"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditCity(city);
                }}
              >
                Edit City
              </button>
              <button
                className="btn btn-red btn-block"
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
      className="btn-circle btn-blue absolute left-62 bottom-4"
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