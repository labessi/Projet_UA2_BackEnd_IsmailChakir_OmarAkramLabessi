<template>
  <div class="produits-container container mt-5">
    <!-- Titre principal -->
    <h1 class="text-center mb-4 fw-bold text-primary">Nos Produits</h1>

    <!-- Grille des produits -->
    <div class="row">
      <div
        v-for="produit in produits"
        :key="produit.id"
        class="col-lg-4 col-md-6 col-sm-12 mb-4"
      >
        <div class="card shadow-sm border-0 h-100">
          <img
            :src="produit.image || 'https://via.placeholder.com/150'"
            class="card-img-top"
            :alt="produit.nom"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-dark">{{ produit.nom }}</h5>
            <p class="card-text text-muted flex-grow-1">
              {{ produit.description }}
            </p>
            <p class="card-text fw-bold text-primary">
              Prix : {{ produit.prix }} €
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "ProduitsClientView",
  data() {
    return {
      produits: [],
    };
  },
  async mounted() {
    try {
      const response = await apiClient.get("/produits");
      this.produits = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  },
};
</script>

<style scoped>
/* Conteneur principal */
.produits-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Cartes des produits */
.card {
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.2rem;
}

.card-text {
  font-size: 1rem;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}
</style>
