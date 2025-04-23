import React, { useEffect, useState } from "react";
import { useCapitalStore } from "../store/capitals";
import { AddCityPopup } from "./AddCityPopup";


export function CapitalList() {
  const { capitals, setCapitals, markers} =
    useCapitalStore();
  const [selectedCapital, setSelectedCapital] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/capital")
      .then((res) => res.json())
      .then(setCapitals);
  }, [setCapitals]);

  const handleAddMarker = (capitalId: number) => {
    const capital = capitals.find((cap) => cap.id === capitalId);
    if (capital) {
      (window as any).addMarkerToCapital(capital); // Call the global method
    }
  };

  const handleRemoveMarker = (capitalId: number) => {
    const capital = capitals.find((cap) => cap.id === capitalId);
    if (capital) {
      (window as any).removeMarkerFromCapital(capital); // Call the global method
    }
  };  

  return (
    <div className="w-1/4 overflow-auto p-4">
      <h2 className="text-xl mb-2">Hauptstädte</h2>
      <ul>
        {capitals.map((cap) => (
          <React.Fragment key={cap.id}>
            <li
              onClick={() =>
                setSelectedCapital((prev) => (prev === cap.id ? null : cap.id)) // Toggle the selected capital
              }
              className="cursor-pointer p-2 border-b hover:bg-gray-200"
            >
              {cap.name} ({cap.country})
              {selectedCapital === cap.id && (
              <div className="p-4 bg-gray-50 border cursor-default rounded shadow mb-2">
              {markers[cap.id] ? (
                <button
                  className="cursor-pointer bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMarker(cap.id)
                  }}
                >
                  Remove Marker
                </button>
              ) : (
                <button
                  className="cursor-pointer bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddMarker(cap.id)
                  }}
                >
                  Add Marker
                </button>
              )}
            </div>
          )}
        </li>
      </React.Fragment>
    ))}
  </ul>

    {/* Circular Button */}
    <button
      className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-400"
      onClick={() => setIsPopupOpen(true)} // Open the popup
    >
      +
    </button>

    {/* Popup */}
    {isPopupOpen && (
      <AddCityPopup
        onClose={() => setIsPopupOpen(false)} // Close the popup
      />
    )}

</div>
);
}