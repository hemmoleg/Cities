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

    console.log("Capitals changed");

    return
    capitals.forEach((cap) => {
      const el = document.createElement("div");
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundColor = "red";

      new mapboxgl.Marker(el)
        .setLngLat([cap.longitude, cap.latitude])
        .setPopup(new mapboxgl.Popup().setText(`${cap.name}, ${cap.country}`))
        .addTo(map);
    });
  }, [capitals]);

  return <div ref={mapContainer} className="flex-1" />;
}