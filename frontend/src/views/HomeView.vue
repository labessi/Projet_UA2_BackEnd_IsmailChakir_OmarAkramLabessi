<template>
  <div class="home bg-light">
    <!-- Header avec un message de bienvenue -->
    <div class="jumbotron text-center bg-white shadow-sm py-5">
      <h1 class="display-4 fw-bold text-primary">Bienvenue</h1>
      <p class="lead text-secondary">
        Vous êtes connecté en tant que <strong>{{ userRole }}</strong
        >.
      </p>
      <button @click="handleLogout" class="btn btn-danger mt-3">
        Se déconnecter
      </button>
    </div>

    <!-- Section Présentation -->
    <section class="container text-center my-5">
      <h2 class="mb-4 fw-bold text-dark">Découvrez notre restaurant</h2>
      <p class="text-muted">
        Savourez des plats préparés avec passion et expertise. Bienvenue dans un
        endroit où chaque repas est une expérience.
      </p>
      <img
        src="https://source.unsplash.com/800x400/?restaurant,food"
        alt="Restaurant"
        class="img-fluid rounded shadow"
      />
    </section>

    <!-- Section Services -->
    <section class="container my-5">
      <h2 class="text-center mb-4 fw-bold text-dark">Nos Services</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body text-center">
              <h5 class="card-title fw-bold">Réservations</h5>
              <p class="card-text text-muted">
                Réservez votre table en ligne en quelques clics.
              </p>
              <router-link to="/reservations-client" class="btn btn-primary"
                >Réservez</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body text-center">
              <h5 class="card-title fw-bold">Nos Produits</h5>
              <p class="card-text text-muted">
                Découvrez notre menu riche et varié.
              </p>
              <router-link to="/produits-client" class="btn btn-primary"
                >Voir les Produits</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body text-center">
              <h5 class="card-title fw-bold">Commandes</h5>
              <p class="card-text text-muted">
                Passez vos commandes en ligne et profitez d'un service rapide.
              </p>
              <router-link to="/commandes-client" class="btn btn-primary"
                >Commandez</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Footer -->
    <footer class="text-center text-white bg-dark py-4">
      <p class="mb-0">
        © {{ new Date().getFullYear() }} Restaurant IO - Tous droits réservés.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      userRole: localStorage.getItem("userRole") || "Client", // Récupère uniquement le rôle
    };
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.home {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Style personnalisé pour le jumbotron */
.jumbotron {
  background-color: #ffffff;
  border-radius: 15px;
}

.card {
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

footer {
  font-size: 0.9rem;
}
</style>
