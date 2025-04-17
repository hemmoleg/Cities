import { create } from "zustand";

export const useCapitalStore = create((set) => ({
  capitals: [],
  setCapitals: (data: any[]) => set({ capitals: data }),
}));