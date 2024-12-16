<template>
  <div id="app">
    <!-- Affiche la barre de navigation sauf sur la page de connexion -->
    <NavbarAdmin v-if="userRole === 'admin' && $route.path !== '/login'" />
    <NavbarClient
      v-else-if="userRole === 'client' && $route.path !== '/login'"
    />
    <router-view />
  </div>
</template>

<script>
import NavbarAdmin from "./components/NavbarAdmin.vue";
import NavbarClient from "./components/NavbarClient.vue";

export default {
  name: "App",
  components: {
    NavbarAdmin,
    NavbarClient,
  },
  data() {
    return {
      userRole: null, // Stocke le rôle utilisateur
    };
  },
  mounted() {
    // Récupérer le rôle utilisateur depuis localStorage
    this.userRole = localStorage.getItem("userRole");
  },
  watch: {
    // Mise à jour dynamique du rôle utilisateur si la route change
    $route() {
      this.userRole = localStorage.getItem("userRole");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
