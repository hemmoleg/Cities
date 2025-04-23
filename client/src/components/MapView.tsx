import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useCityStore } from "../store/cities";
import 'mapbox-gl/dist/mapbox-gl.css';
import { City } from "../store/city";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;;

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { cities, cityColors, setCityColor,  markers, addMarker, removeMarker } = useCityStore();

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

  // Function to show marker for a capital
  const addMarkerToCity = (city: City) => {
    const existingMarkers = markers;
    if (existingMarkers[city.id]) return;

    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundColor = cityColors[city.id] || "red";
    el.dataset.id = city.id.toString();

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = cityColors[city.id] || "#ff0000";
    colorInput.addEventListener("input", (e) => {
      const newColor = (e.target as HTMLInputElement).value;
      el.style.backgroundColor = newColor;
      setCityColor(city.id, newColor);
    });

    const popupContent = document.createElement("div");
    popupContent.innerText = `${city.name}, ${city.country}`;
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
      .setLngLat([city.longitude, city.latitude])
      .addTo(mapRef.current!);

    existingMarkers[city.id] = marker;

    let hovering = false;

      const showPopup = () => {
        popup.setLngLat([city.longitude, city.latitude]).addTo(mapRef.current!);
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

      addMarker(city.id, marker);
  };

  const removeMarkerFromCapital = (city: City) => {

    const existingMarkers = markers;
    if (!existingMarkers[city.id]) return;

    existingMarkers[city.id].remove();
    delete existingMarkers[city.id];
    removeMarker(city.id);
  }

  // Public method via window for adding a marker externally
  useEffect(() => {
    (window as any).addMarkerToCity = addMarkerToCity;
    (window as any).removeMarkerFromCity = removeMarkerFromCapital;
  }, [cities, cityColors]);

  // Update marker colors only when colors change
  useEffect(() => {
    const existingMarkers = markers;
    const { lastUpdatedId } = useCityStore.getState();

    if (lastUpdatedId == undefined) 
      return
    
    const marker = existingMarkers[lastUpdatedId];
    if (marker) {
      const el = marker.getElement();
      const color = cityColors[lastUpdatedId];
      if (color) el.style.backgroundColor = color;
    
    }
  }, [cityColors]);

  return <div ref={mapContainer} className="flex-1" />;
}