import { create } from "zustand";
import { persist } from "zustand/middleware";

let AppStore = (set) => ({
  dopen: true,
  user: [],
  setUser: (user) => set((state) => ({ user:user })),
  updateOpen: (dopen) => set({ dopen }),
});

AppStore = persist(AppStore, { name: "my_app_store" });
export const UseAppStore = create(AppStore);
