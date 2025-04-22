import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useCapitalStore } from "../store/capitals";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;;

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { capitals } = useCapitalStore();

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
      zoom: 1.5,
    });

    capitals.forEach((cap) => {
      const el = document.createElement("div");
      el.className = "marker"

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      }).setText(`${cap.name}, ${cap.country}`);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([cap.longitude, cap.latitude])
        .addTo(map);

      // Show popup on hover
      el.addEventListener("mouseenter", () => {
        popup.setLngLat([cap.longitude, cap.latitude]).addTo(map);
      });

      // Hide popup when not hovering
      el.addEventListener("mouseleave", () => {
        popup.remove();
      });
    });
  }, [capitals]);

  return <div ref={mapContainer} className="flex-1" />;
}