import { create } from "zustand";

type MarkerStore = {
  markers: Record<number, mapboxgl.Marker>;
  cityColors: Record<number, string>;

  addMarker: (cityId: number, marker: mapboxgl.Marker) => void;
  removeMarker: (cityId: number) => void;
  setCityColor: (id: number, color: string) => void;
};

export const useMarkerStore = create<MarkerStore>((set) => ({
  markers: {},
  cityColors: {},

  addMarker: (cityId, marker) =>
    set((state) => ({
      markers: { ...state.markers, [cityId]: marker },
    })),
  removeMarker: (cityId) =>
    set((state) => {
      const updatedMarkers = { ...state.markers };
      delete updatedMarkers[cityId];
      return { markers: updatedMarkers };
    }),

  setCityColor: (id, color) =>
    set((state) => ({
      cityColors: {
        ...state.cityColors,
        [id]: color,
      },
      lastUpdatedId: id,
    })),
}));