<template>
  <div class="clients-container container py-4">
    <h1 class="text-center mb-4 text-primary fw-bold">Liste des Clients</h1>

    <!-- Tableau des clients -->
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle shadow-sm">
        <thead class="table-primary">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.nom }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.telephone }}</td>
            <td class="text-center">
              <!-- Boutons d'action -->
              <button
                class="btn btn-outline-primary btn-sm me-2"
                @click="editClient(client.id)"
              >
                <i class="bi bi-pencil-square"></i> Modifier
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="deleteClient(client.id)"
              >
                <i class="bi bi-trash"></i> Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "ClientsView",
  data() {
    return {
      clients: [],
    };
  },
  methods: {
    async fetchClients() {
      try {
        const response = await apiClient.get("/clients");
        this.clients = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
      }
    },
    editClient(id) {
      alert(`Modifier le client avec l'ID ${id}`);
    },
    async deleteClient(id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
        try {
          await apiClient.delete(`/clients/${id}`);
          this.clients = this.clients.filter((client) => client.id !== id);
          alert("Client supprimé avec succès !");
        } catch (error) {
          console.error("Erreur lors de la suppression du client :", error);
        }
      }
    },
  },
  mounted() {
    this.fetchClients();
  },
};
</script>

<style scoped>
.clients-container {
  background-color: #f8f9fa; /* Fond gris clair */
  border-radius: 8px;
}

.table th,
.table td {
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: #e2f0ff; /* Nuance de bleu en hover */
}

.btn {
  transition: all 0.3s ease-in-out;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

h1 {
  text-transform: uppercase;
  letter-spacing: 1px;
}

.table-primary {
  background-color: #007bff;
  color: #ffffff;
}
</style>
