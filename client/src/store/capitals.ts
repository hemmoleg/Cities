import { create } from "zustand";
import { Capital } from "./capital";

type CapitalStore = {
  capitals: Capital[];
  capitalColors: Record<number, string>;
  lastUpdatedId?: number;
  markers: Record<number, mapboxgl.Marker>;

  setCapitals: (data: Capital[]) => void;
  setCapitalColor: (id: number, color: string) => void;
  addMarker: (capitalId: number, marker: mapboxgl.Marker) => void;
  removeMarker: (capitalId: number) => void;
};

export const useCapitalStore = create<CapitalStore>((set) => ({
  capitals: [],
  capitalColors: {},
  markers: {},

  setCapitals: (data: any[]) => set({ capitals: data }),

  setCapitalColor: (id, color) =>
    set((state) => ({
      capitalColors: {
        ...state.capitalColors,
        [id]: color,
      },
      lastUpdatedId: id,
    })),

  addMarker: (capitalId, marker) =>
    set((state) => ({
      markers: { ...state.markers, [capitalId]: marker },
    })),
  removeMarker: (capitalId) =>
    set((state) => {
      const updatedMarkers = { ...state.markers };
      delete updatedMarkers[capitalId];
      return { markers: updatedMarkers };
    }),
}));