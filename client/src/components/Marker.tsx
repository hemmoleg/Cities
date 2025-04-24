import React from "react";
import { City } from "../store/city";
import { useCityStore } from "../store/cities";

interface MarkerComponentProps {
  color: string;
  cityId: number;
  popup: mapboxgl.Popup;
  mapRef: React.RefObject<mapboxgl.Map | null>;
}

export function MarkerComponent({ color, cityId, popup, mapRef }: MarkerComponentProps) {
  
  const city = useCityStore((state) => state.cities.find((c) => c.id === cityId)); 
  useCityStore((state) => color = state.cityColors[cityId]); 

  const onMouseEnter = () => {
    if (!mapRef || !city) return;
    popup.setLngLat([city.longitude, city.latitude]).addTo(mapRef.current!);
  }

  const onMouseLeave = () => {
    //popup.remove();
  }
  
  return (
    <div
      className="marker"
      style={{ backgroundColor: color }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}