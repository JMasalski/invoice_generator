// store/useSidebarStore.js
import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
    open: true,
    toggleSidebar: () => set((state) => ({ open: !state.open })),
}));
