<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Restaurant IO - Admin</a>
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
            <router-link class="nav-link" to="/menus">Menus</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/produits">Produits</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/clients">Clients</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tables">Tables</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reservations"
              >Réservations</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/commandes"
              >Commandes</router-link
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
  name: "NavbarAdmin",
  methods: {
    logout() {
      localStorage.clear(); // Déconnexion de l'utilisateur
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
