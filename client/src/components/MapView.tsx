import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useCapitalStore } from "../store/capitals";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;;

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { capitals, capitalColors, setCapitalColor } = useCapitalStore();

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
      el.style.backgroundColor = capitalColors[cap.id] || "red";

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
        .addTo(map);

      let hovering = false;

      const showPopup = () => {
        popup.setLngLat([cap.longitude, cap.latitude]).addTo(map);
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
        setTimeout(hidePopup, 100);
      });

    });
  }, [capitals, capitalColors, setCapitalColor]);

  return <div ref={mapContainer} className="flex-1" />;
}