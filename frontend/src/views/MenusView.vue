<template>
  <div class="menus container py-5">
    <h1 class="text-center text-primary mb-4">Gestion des Menus</h1>

    <!-- Bouton pour afficher/cacher le formulaire -->
    <div class="text-center mb-4">
      <button class="btn btn-primary" @click="showCreateForm = !showCreateForm">
        {{ showCreateForm ? "Annuler" : "Créer un Nouveau Menu" }}
      </button>
    </div>

    <!-- Formulaire de création de menu -->
    <div v-if="showCreateForm" class="card shadow-sm p-4 mb-4">
      <h2 class="text-center text-secondary mb-3">Créer un Nouveau Menu</h2>
      <form @submit.prevent="createMenu">
        <div class="form-group mb-3">
          <label for="nom" class="form-label">Nom :</label>
          <input
            v-model="newMenu.nom"
            type="text"
            id="nom"
            class="form-control"
            placeholder="Entrez le nom du menu"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="description" class="form-label">Description :</label>
          <textarea
            v-model="newMenu.description"
            id="description"
            class="form-control"
            placeholder="Entrez une description"
          ></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success">Créer</button>
        </div>
      </form>
    </div>

    <!-- Liste des menus -->
    <div class="row">
      <div v-for="menu in menus" :key="menu.id" class="col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">{{ menu.nom }}</h5>
            <p class="card-text">{{ menu.description }}</p>
            <p>
              <strong>Statut :</strong>
              <span
                class="badge"
                :class="menu.isActive ? 'bg-success' : 'bg-secondary'"
              >
                {{ menu.isActive ? "Actif" : "Inactif" }}
              </span>
            </p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-warning btn-sm" @click="editMenu(menu)">
                Modifier
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="deleteMenu(menu.id)"
              >
                Supprimer
              </button>
              <button
                class="btn btn-info btn-sm"
                @click="toggleMenuStatus(menu.id, menu.isActive)"
              >
                {{ menu.isActive ? "Désactiver" : "Activer" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire de modification -->
    <div v-if="editingMenu" class="card shadow-sm p-4">
      <h2 class="text-center text-secondary mb-3">Modifier le Menu</h2>
      <form @submit.prevent="updateMenu(editingMenu.id)">
        <div class="form-group mb-3">
          <label for="edit-nom" class="form-label">Nom :</label>
          <input
            v-model="editingMenu.nom"
            type="text"
            id="edit-nom"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="edit-description" class="form-label">Description :</label>
          <textarea
            v-model="editingMenu.description"
            id="edit-description"
            class="form-control"
          ></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success">Mettre à Jour</button>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "MenusView",
  data() {
    return {
      menus: [],
      newMenu: {
        nom: "",
        description: "",
      },
      editingMenu: null,
      showCreateForm: false,
    };
  },
  methods: {
    async fetchMenus() {
      try {
        const response = await apiClient.get("/menus");
        this.menus = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des menus :", error);
      }
    },
    async createMenu() {
      try {
        await apiClient.post("/menus", this.newMenu);
        alert("Menu créé avec succès !");
        this.newMenu = { nom: "", description: "" };
        this.showCreateForm = false;
        this.fetchMenus();
      } catch (error) {
        console.error("Erreur lors de la création du menu :", error);
        alert("Impossible de créer le menu.");
      }
    },
    async toggleMenuStatus(id, currentStatus) {
      try {
        await apiClient.put(`/menus/${id}`, { isActive: !currentStatus });
        alert("Statut du menu mis à jour !");
        this.fetchMenus();
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
      }
    },
    editMenu(menu) {
      this.editingMenu = { ...menu };
    },
    async updateMenu(id) {
      try {
        await apiClient.put(`/menus/${id}`, this.editingMenu);
        alert("Menu mis à jour avec succès !");
        this.editingMenu = null;
        this.fetchMenus();
      } catch (error) {
        console.error("Erreur lors de la mise à jour du menu :", error);
      }
    },
    cancelEdit() {
      this.editingMenu = null;
    },
    async deleteMenu(id) {
      try {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce menu ?")) {
          await apiClient.delete(`/menus/${id}`);
          alert("Menu supprimé avec succès !");
          this.fetchMenus();
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du menu :", error);
      }
    },
  },
  mounted() {
    this.fetchMenus();
  },
};
</script>

<style scoped>
.menus {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Boutons */
.btn-primary {
  margin-bottom: 10px;
}

.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Badges */
.badge {
  padding: 0.5em;
  font-size: 0.8em;
}
</style>
