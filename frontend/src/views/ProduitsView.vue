<template>
  <div class="produits-container container mt-5">
    <!-- Titre principal -->
    <h1 class="text-center mb-4 fw-bold text-primary">Gestion des Produits</h1>

    <!-- Bouton d'ajout -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary fw-bold" @click="showAddForm = true">
        Ajouter un Produit
      </button>
    </div>

    <!-- Formulaire d'ajout ou de modification -->
    <div v-if="showAddForm || editingProduit" class="card mb-4 shadow-sm">
      <div class="card-body">
        <h2 class="card-title mb-3">
          {{ editingProduit ? "Modifier" : "Ajouter" }} un Produit
        </h2>
        <form @submit.prevent="editingProduit ? updateProduit() : addProduit()">
          <div class="mb-3">
            <label for="nom" class="form-label">Nom :</label>
            <input
              v-model="formData.nom"
              type="text"
              id="nom"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description :</label>
            <textarea
              v-model="formData.description"
              id="description"
              class="form-control"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="prix" class="form-label">Prix :</label>
            <input
              v-model="formData.prix"
              type="number"
              id="prix"
              class="form-control"
              step="0.01"
              required
            />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-success">
              {{ editingProduit ? "Modifier" : "Ajouter" }}
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelEdit">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Liste des produits -->
    <div class="row">
      <div
        v-for="produit in produits"
        :key="produit.id"
        class="col-lg-4 col-md-6 col-sm-12 mb-4"
      >
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-primary">{{ produit.nom }}</h5>
            <p class="card-text text-muted">{{ produit.description }}</p>
            <p class="card-text fw-bold text-dark">
              Prix : {{ produit.prix }}€
            </p>
            <div class="mt-auto d-flex justify-content-between">
              <button class="btn btn-warning" @click="editProduit(produit)">
                Modifier
              </button>
              <button class="btn btn-danger" @click="deleteProduit(produit.id)">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "ProduitsView",
  data() {
    return {
      produits: [],
      formData: {
        nom: "",
        description: "",
        prix: "",
      },
      showAddForm: false,
      editingProduit: null,
    };
  },
  methods: {
    async fetchProduits() {
      try {
        const response = await apiClient.get("/produits");
        this.produits = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    },
    async addProduit() {
      try {
        await apiClient.post("/produits", this.formData);
        alert("Produit ajouté avec succès !");
        this.fetchProduits();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit :", error);
      }
    },
    async updateProduit() {
      try {
        await apiClient.put(
          `/produits/${this.editingProduit.id}`,
          this.formData
        );
        alert("Produit mis à jour avec succès !");
        this.fetchProduits();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de la modification du produit :", error);
      }
    },
    async deleteProduit(id) {
      try {
        await apiClient.delete(`/produits/${id}`);
        alert("Produit supprimé avec succès !");
        this.fetchProduits();
      } catch (error) {
        console.error("Erreur lors de la suppression du produit :", error);
      }
    },
    editProduit(produit) {
      this.editingProduit = produit;
      this.formData = { ...produit };
      this.showAddForm = false;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.editingProduit = null;
      this.showAddForm = false;
      this.formData = {
        nom: "",
        description: "",
        prix: "",
      };
    },
  },
  mounted() {
    this.fetchProduits();
  },
};
</script>

<style scoped>
.produits-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.btn-warning {
  color: white;
}

.card-title {
  font-size: 1.2rem;
}

.card-text {
  font-size: 1rem;
}

h1 {
  color: #007bff;
}
</style>
