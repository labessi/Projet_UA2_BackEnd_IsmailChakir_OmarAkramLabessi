<template>
  <div class="commandes container py-4">
    <!-- Titre -->
    <h1 class="text-center mb-4 text-primary fw-bold">Vos Commandes</h1>

    <!-- Formulaire d'ajout de commande -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h4 class="card-title mb-3">Ajouter une Commande</h4>
        <form @submit.prevent="addCommande">
          <div class="mb-3">
            <label for="produit" class="form-label">Produit :</label>
            <input
              v-model="newCommande.produit"
              id="produit"
              class="form-control"
              placeholder="Entrez le nom du produit"
              required
            />
          </div>
          <div class="mb-3">
            <label for="quantite" class="form-label">Quantité :</label>
            <input
              v-model="newCommande.quantite"
              id="quantite"
              type="number"
              class="form-control"
              min="1"
              placeholder="Entrez la quantité"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Ajouter Commande
          </button>
        </form>
      </div>
    </div>

    <!-- Tableau des commandes -->
    <div class="table-responsive">
      <table class="table table-striped table-hover shadow-sm">
        <thead class="table-primary">
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="commande in commandes" :key="commande.id">
            <td>{{ commande.produit }}</td>
            <td>{{ commande.quantite }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "CommandesClientView",
  data() {
    return {
      commandes: [], // Liste des commandes
      newCommande: {
        produit: "",
        quantite: 1,
      },
    };
  },
  methods: {
    // Récupérer les commandes de l'utilisateur connecté
    async fetchCommandes() {
      try {
        const clientName = localStorage.getItem("userName");
        const response = await apiClient.get(
          `/commandes/by-client?nom_client=${clientName}`
        );
        this.commandes = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error);
      }
    },
    // Ajouter une nouvelle commande
    async addCommande() {
      try {
        const clientEmail = localStorage.getItem("userEmail"); // Récupérer l'email unique
        const response = await apiClient.post(`/commandes`, {
          ...this.newCommande,
          email_client: clientEmail, // Assurez-vous que le backend supporte ce champ
        });

        this.commandes.push(response.data);
        this.newCommande.produit = "";
        this.newCommande.quantite = 1;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la commande :", error);
      }
    },
  },
  mounted() {
    this.fetchCommandes();
  },
};
</script>

<style scoped>
/* Contexte global */
.commandes {
  background-color: #f8f9fa; /* Fond gris clair */
  border-radius: 8px;
}

/* Style des formulaires */
.card {
  border-radius: 8px;
}

.card-title {
  color: #007bff;
}

/* Tableau */
.table th {
  text-transform: uppercase;
  letter-spacing: 1px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f8f9fa;
}

.table-hover tbody tr:hover {
  background-color: #e2f0ff;
}

/* Bouton */
.btn {
  transition: all 0.3s ease-in-out;
}
</style>
