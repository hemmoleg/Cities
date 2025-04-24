import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useCityStore } from "../store/cities";
import 'mapbox-gl/dist/mapbox-gl.css';
import { City } from "../store/city";
import ReactDOM from "react-dom/client";
import { MarkerComponent } from "./Marker";
import { PopupComponent } from "./MarkerPopup";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;;

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { cities, cityColors, setCityColor,  markers, addMarker } = useCityStore();

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
      zoom: 1.5,
    });
  }, []);

  
  const addMarkerToCity = (city: City) => {
   
    const { markers } = useCityStore.getState();

    if (markers[city.id]) return;

    const color = cityColors[city.id] || "#FF0000";
    const popupContainer = document.createElement("div");
    const popupRoot = ReactDOM.createRoot(popupContainer);
    popupRoot.render(
      <PopupComponent
        cityId={city.id}
        cityName={city.name}
        countryName={city.country}
        color={color}
        onColorChange={(newColor) => {
          setCityColor(city.id, newColor)
        }}
      />
    );
    setCityColor(city.id, color);

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    }).setDOMContent(popupContainer);
    

    const markerContainer = document.createElement("div");
    const markerRoot = ReactDOM.createRoot(markerContainer);
    markerRoot.render(
      <MarkerComponent
        color={color}
        cityId={city.id}
        popup={popup}
        mapRef={mapRef}
      />
    );

    const marker = new mapboxgl.Marker(markerContainer)
      .setLngLat([city.longitude, city.latitude])
      .addTo(mapRef.current!);

    addMarker(city.id, marker);
  };

  // Public method via window for adding a marker externally
  useEffect(() => {
    (window as any).addMarkerToCity = addMarkerToCity;
  }, [cities, cityColors]);

  return <div ref={mapContainer} className="flex-1" />;
}