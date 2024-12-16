<template>
  <div class="panier-container container mt-5">
    <!-- Titre principal -->
    <h1 class="text-center mb-4 fw-bold text-primary">Votre Panier</h1>

    <!-- Liste des commandes -->
    <div v-if="commandes.length > 0" class="list-group shadow-sm">
      <div
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="commande in commandes"
        :key="commande.id"
      >
        <div>
          <h5 class="mb-0 text-dark">{{ commande.produit }}</h5>
          <small class="text-muted">Quantité : {{ commande.quantite }}</small>
        </div>
        <span class="badge bg-primary rounded-pill fs-6">
          {{ commande.prix }} €
        </span>
      </div>
    </div>

    <!-- Message si le panier est vide -->
    <div v-else class="text-center mt-5">
      <p class="text-muted fs-5">Votre panier est vide.</p>
      <router-link to="/produits-client" class="btn btn-primary fw-bold mt-3">
        Parcourir les produits
      </router-link>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "PanierClientView",
  data() {
    return {
      commandes: [],
    };
  },
  async mounted() {
    try {
      const clientEmail = localStorage.getItem("userEmail");
      const response = await apiClient.get(
        `/commandes/by-client?email=${clientEmail}`
      );
      this.commandes = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
    }
  },
};
</script>

<style scoped>
/* Style principal pour le conteneur */
.panier-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Style pour le badge des prix */
.badge {
  font-size: 1rem;
  padding: 0.5em 0.8em;
}

/* Liste des produits */
.list-group-item {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: box-shadow 0.3s ease-in-out;
}

.list-group-item:hover {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

/* Bouton Parcourir les produits */
.btn-primary {
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>
