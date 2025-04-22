import { create } from "zustand";
import { Capital } from "./capital";

type CapitalStore = {
  capitals: Capital[];
  setCapitals: (data: Capital[]) => void;
};

export const useCapitalStore = create<CapitalStore>((set) => ({
  capitals: [],
  setCapitals: (data: any[]) => set({ capitals: data }),
}));