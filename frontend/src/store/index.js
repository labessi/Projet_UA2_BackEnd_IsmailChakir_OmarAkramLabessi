import { defineStore } from "pinia";

// Exemple de store (vous pouvez le personnaliser selon vos besoins)
export const useMainStore = defineStore("main", {
  // État global de l'application
  state: () => ({
    user: null, // Par exemple, un utilisateur connecté
    isAuthenticated: false, // État d'authentification
  }),

  // Getter pour calculer des valeurs dérivées de l'état
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },

  // Actions pour mettre à jour l'état (comme les mutations dans Vuex)
  actions: {
    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user; // Mettre à jour l'état d'authentification
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
