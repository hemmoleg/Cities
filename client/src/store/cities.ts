import { create } from "zustand";
import { City } from "./city";

type CityStore = {
  cities: City[];
  cityColors: Record<number, string>;
  lastUpdatedId?: number;
  markers: Record<number, mapboxgl.Marker>;

  setCities: (data: City[]) => void;
  setCityColor: (id: number, color: string) => void;
  addMarker: (capitalId: number, marker: mapboxgl.Marker) => void;
  removeMarker: (capitalId: number) => void;
};

export const useCityStore = create<CityStore>((set) => ({
  cities: [],
  cityColors: {},
  markers: {},

  setCities: (data: any[]) => set({ cities: data }),

  setCityColor: (id, color) =>
    set((state) => ({
      cityColors: {
        ...state.cityColors,
        [id]: color,
      },
      lastUpdatedId: id,
    })),

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
}));