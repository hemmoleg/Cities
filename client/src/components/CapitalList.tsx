import React, { useEffect } from "react";
import { useCapitalStore } from "../store/capitals";

export function CapitalList() {
  const { capitals, setCapitals } = useCapitalStore();

  useEffect(() => {
    fetch("http://localhost:3000/capital")
      .then((res) => res.json())
      .then(setCapitals);
  }, [setCapitals]);

  return (
    <div className="w-1/4 overflow-auto p-4">
      <h2 className="text-xl mb-2">Hauptstädte</h2>
      <ul>
        {capitals.map((cap) => (
          <li key={cap.id}>{cap.name} ({cap.country})</li>
        ))}
      </ul>
    </div>
  );
}