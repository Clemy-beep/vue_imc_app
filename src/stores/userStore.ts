import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
  }),
  getters: {
    getStats: (state) => state.user,
  },
  actions: {},
});
