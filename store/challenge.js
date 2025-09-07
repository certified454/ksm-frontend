import { create } from "zustand";

export const useChallengeStore = create((set) => ({
    lastChallengeId: null,
   setLastChallengeId: (id) => set({ lastChallengeId: id }),
}));