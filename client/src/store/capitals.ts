import { create } from "zustand";
import { Capital } from "./capital";

type CapitalStore = {
  capitals: Capital[];
  capitalColors: Record<number, string>;
  lastUpdatedId?: number;

  setCapitals: (data: Capital[]) => void;
  setCapitalColor: (id: number, color: string) => void;
};

export const useCapitalStore = create<CapitalStore>((set) => ({
  capitals: [],
  capitalColors: {},

  setCapitals: (data: any[]) => set({ capitals: data }),

  setCapitalColor: (id, color) =>
    set((state) => ({
      capitalColors: {
        ...state.capitalColors,
        [id]: color,
      },
      lastUpdatedId: id,
    })),
}));