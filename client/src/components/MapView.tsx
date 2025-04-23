import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useCapitalStore } from "../store/capitals";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;;

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { capitals, capitalColors, setCapitalColor } = useCapitalStore();
  const markerMapRef = useRef<Record<number, mapboxgl.Marker>>({});

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
      zoom: 1.5,
    });
  }, []);

  // Add markers when capitals change
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const existingMarkers = markerMapRef.current;

    // Add or update markers
    capitals.forEach((cap) => {
      if (existingMarkers[cap.id]) return; 

      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = capitalColors[cap.id] || "red";
      el.dataset.id = cap.id.toString();

      const colorInput = document.createElement("input");
      colorInput.type = "color";
      colorInput.value = capitalColors[cap.id] || "#ff0000";
      colorInput.addEventListener("input", (e) => {
        const newColor = (e.target as HTMLInputElement).value;
        el.style.backgroundColor = newColor;
        setCapitalColor(cap.id, newColor);
      });

      const popupContent = document.createElement("div");
      popupContent.innerText = `${cap.name}, ${cap.country}`;
      popupContent.appendChild(document.createElement("br"));
      popupContent.appendChild(colorInput);

      const wrapper = document.createElement("div");
      wrapper.appendChild(popupContent);
      wrapper.style.display = "inline-block";

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      }).setDOMContent(wrapper);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([cap.longitude, cap.latitude])
        .addTo(mapRef.current!);

      existingMarkers[cap.id] = marker;


      let hovering = false;

      const showPopup = () => {
        popup.setLngLat([cap.longitude, cap.latitude]).addTo(mapRef.current!);
      };

      const hidePopup = () => {
        if (!hovering) popup.remove();
      };

      el.addEventListener("mouseenter", () => {
        hovering = true;
        showPopup();
      });

      el.addEventListener("mouseleave", () => {
        hovering = false;
        setTimeout(hidePopup, 100);
      });

      wrapper.addEventListener("mouseenter", () => {
        hovering = true;
      });

      wrapper.addEventListener("mouseleave", () => {
        hovering = false;
        hidePopup();
      });
    });
  }, [capitals]);

  // Update marker colors only when colors change
  useEffect(() => {
    const existingMarkers = markerMapRef.current;
    const { lastUpdatedId } = useCapitalStore.getState();

    if (lastUpdatedId == undefined) 
      return
    
    const marker = existingMarkers[lastUpdatedId];
    if (marker) {
      const el = marker.getElement();
      const color = capitalColors[lastUpdatedId];
      if (color) el.style.backgroundColor = color;
    
    }
  }, [capitalColors]);

  return <div ref={mapContainer} className="flex-1" />;
}