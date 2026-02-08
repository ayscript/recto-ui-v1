import { create } from "zustand";

interface DashboardState {
  designs: any[];
  setDesigns: (designs: any[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    designs: [],
    setDesigns: (designs) => set({ designs }),
}));