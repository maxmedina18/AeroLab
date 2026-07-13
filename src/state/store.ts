import { create } from "zustand";

export type VizMode = "velocity" | "streamlines" | "smoke" | "pressure";

interface SimState {
  windSpeed: number; // m/s, control-panel value
  angleOfAttack: number; // degrees, -20 to 20
  vizMode: VizMode;
  isPaused: boolean;
  fps: number;
  frame: number;
  setWindSpeed: (v: number) => void;
  setAngleOfAttack: (v: number) => void;
  setVizMode: (m: VizMode) => void;
  togglePause: () => void;
  reset: () => void;
  tick: (fps: number) => void;
}

const DEFAULTS = {
  windSpeed: 12,
  angleOfAttack: 4,
  vizMode: "streamlines" as VizMode,
};

export const useSimStore = create<SimState>((set) => ({
  ...DEFAULTS,
  isPaused: false,
  fps: 0,
  frame: 0,
  setWindSpeed: (v) => set({ windSpeed: v }),
  setAngleOfAttack: (v) => set({ angleOfAttack: v }),
  setVizMode: (m) => set({ vizMode: m }),
  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),
  reset: () => set({ ...DEFAULTS, frame: 0 }),
  tick: (fps) => set((s) => ({ fps, frame: s.frame + 1 })),
}));
