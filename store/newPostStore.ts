import { create } from 'zustand';

type NewPostStore = {
  newPostCount: number;
  setNewPostCount: (count: number) => void;
  incrementNewPostCount: () => void;
  resetNewPostCount: () => void;
};

export const useNewPostStore = create<NewPostStore>((set) => ({
  newPostCount: 0,
  setNewPostCount: (count) => set({ newPostCount: count }),
  incrementNewPostCount: () => set((state) => ({ newPostCount: state.newPostCount + 1 })),
  resetNewPostCount: () => set({ newPostCount: 0 }),
}));
