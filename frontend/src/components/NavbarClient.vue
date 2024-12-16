<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Restaurant IO - Client</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/produits-client"
              >Produits</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reservations-client"
              >Réservations</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/commandes-client"
              >Commandes</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/panier-client"
              >Panier</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login" @click="logout"
              >Déconnexion</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarClient",
  methods: {
    logout() {
      localStorage.clear(); // Supprime toutes les données de session
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
