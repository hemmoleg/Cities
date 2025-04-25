import { create } from "zustand";
import { City } from "./city";

type CityStore = {
  cities: City[];
  lastUpdatedId?: number;

  setCities: (data: City[]) => void;
};

export const useCityStore = create<CityStore>((set) => ({
  cities: [],

  setCities: (data: any[]) => set({ cities: data }),
}));