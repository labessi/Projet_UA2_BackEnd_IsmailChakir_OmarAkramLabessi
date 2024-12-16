<template>
  <div class="tables-container container mt-5">
    <!-- Titre principal -->
    <h1 class="text-center mb-4 fw-bold text-primary">Gestion des Tables</h1>

    <!-- Bouton pour afficher le formulaire -->
    <div class="text-center mb-4">
      <button class="btn btn-primary fw-bold" @click="showAddForm = true">
        Ajouter une Table
      </button>
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div v-if="showAddForm || editingTable" class="card shadow-sm p-4 mb-4">
      <h2 class="fw-bold text-secondary mb-3">
        {{ editingTable ? "Modifier" : "Ajouter" }} une Table
      </h2>
      <form @submit.prevent="editingTable ? updateTable() : addTable()">
        <div class="mb-3">
          <label for="noTable" class="form-label">Numéro de la Table :</label>
          <input
            v-model="formData.noTable"
            type="number"
            class="form-control"
            id="noTable"
            required
            placeholder="Exemple : 1"
          />
        </div>
        <div class="mb-3">
          <label for="capacite" class="form-label">Capacité :</label>
          <input
            v-model="formData.capacite"
            type="number"
            class="form-control"
            id="capacite"
            required
            placeholder="Exemple : 4"
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success me-2 fw-bold">
            {{ editingTable ? "Modifier" : "Ajouter" }}
          </button>
          <button
            type="button"
            class="btn btn-secondary fw-bold"
            @click="cancelEdit"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des tables -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover text-center">
        <thead class="table-primary">
          <tr>
            <th>ID</th>
            <th>Numéro de Table</th>
            <th>Capacité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="table in filteredTables" :key="table.id">
            <td>{{ table.id }}</td>
            <td>{{ table.noTable }}</td>
            <td>{{ table.capacite }}</td>
            <td>
              <button
                class="btn btn-sm btn-warning me-2"
                @click="editTable(table)"
              >
                Modifier
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteTable(table.id)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucune table n'est disponible -->
    <div v-if="filteredTables.length === 0" class="text-center mt-4">
      <p class="text-muted">Aucune table disponible.</p>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "TablesView",
  data() {
    return {
      tables: [],
      formData: {
        noTable: "",
        capacite: "",
      },
      showAddForm: false,
      editingTable: null,
    };
  },
  computed: {
    // Filtrer uniquement les tables valides
    filteredTables() {
      return this.tables.filter((table) => table.noTable && table.capacite);
    },
  },
  methods: {
    async fetchTables() {
      try {
        const response = await apiClient.get("/tables");
        this.tables = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des tables :", error);
        alert("Erreur lors de la récupération des données.");
      }
    },
    async addTable() {
      try {
        await apiClient.post("/tables", this.formData);
        alert("Table ajoutée avec succès !");
        this.fetchTables();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la table :", error);
        alert("Erreur lors de l'ajout de la table.");
      }
    },
    async updateTable() {
      try {
        await apiClient.put(`/tables/${this.editingTable.id}`, this.formData);
        alert("Table mise à jour avec succès !");
        this.fetchTables();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de la modification de la table :", error);
        alert("Erreur lors de la modification de la table.");
      }
    },
    async deleteTable(id) {
      try {
        await apiClient.delete(`/tables/${id}`);
        alert("Table supprimée avec succès !");
        this.fetchTables();
      } catch (error) {
        console.error("Erreur lors de la suppression de la table :", error);
        alert("Erreur lors de la suppression de la table.");
      }
    },
    editTable(table) {
      this.editingTable = table;
      this.formData = { ...table };
      this.showAddForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.editingTable = null;
      this.showAddForm = false;
      this.formData = {
        noTable: "",
        capacite: "",
      };
    },
  },
  mounted() {
    this.fetchTables();
  },
};
</script>

<style scoped>
.tables-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.table th {
  text-transform: uppercase;
  font-size: 0.9rem;
}

.btn {
  font-size: 0.85rem;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  transform: translateY(-2px);
}

.text-muted {
  font-size: 1rem;
  color: #6c757d;
}
</style>
