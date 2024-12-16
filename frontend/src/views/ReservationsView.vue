<template>
  <div class="reservations-container container mt-5">
    <!-- Titre principal -->
    <h1 class="text-center mb-4 fw-bold text-primary">
      Gestion des Réservations
    </h1>

    <!-- Bouton pour afficher le formulaire -->
    <div class="text-center mb-4">
      <button @click="showAddForm = true" class="btn btn-primary fw-bold">
        Ajouter une Réservation
      </button>
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div
      v-if="showAddForm || editingReservation"
      class="card shadow-sm p-4 mb-4"
    >
      <h2 class="fw-bold mb-3 text-secondary">
        {{ editingReservation ? "Modifier" : "Ajouter" }} une Réservation
      </h2>
      <form
        @submit.prevent="
          editingReservation ? updateReservation() : addReservation()
        "
      >
        <div class="mb-3">
          <label for="date" class="form-label">Date :</label>
          <input
            v-model="formData.date"
            type="date"
            id="date"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="no_tables_reserver" class="form-label"
            >Numéros des Tables :</label
          >
          <input
            v-model="formData.no_tables_reserver"
            type="text"
            id="no_tables_reserver"
            class="form-control"
            placeholder="Exemple : [1, 2, 3]"
            required
          />
        </div>
        <div class="mb-3">
          <label for="nom_client" class="form-label">Nom du Client :</label>
          <input
            v-model="formData.nom_client"
            type="text"
            id="nom_client"
            class="form-control"
            placeholder="Entrez le nom du client"
            required
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success me-2 fw-bold">
            {{ editingReservation ? "Modifier" : "Ajouter" }}
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

    <!-- Liste des réservations -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover text-center">
        <thead class="table-primary">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Tables Réservées</th>
            <th>Nom du Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id">
            <td>{{ reservation.id }}</td>
            <td>{{ reservation.date }}</td>
            <td>{{ reservation.no_tables_reserver }}</td>
            <td>{{ reservation.nom_client }}</td>
            <td>
              <button
                @click="editReservation(reservation)"
                class="btn btn-sm btn-warning me-2"
              >
                Modifier
              </button>
              <button
                @click="deleteReservation(reservation.id)"
                class="btn btn-sm btn-danger"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucune réservation n'est disponible -->
    <div v-if="reservations.length === 0" class="text-center mt-4">
      <p class="text-muted">Aucune réservation trouvée.</p>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "ReservationsView",
  data() {
    return {
      reservations: [],
      formData: {
        date: "",
        no_tables_reserver: "",
        nom_client: "",
      },
      showAddForm: false,
      editingReservation: null,
    };
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await apiClient.get("/reservations");
        this.reservations = response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des réservations :",
          error
        );
      }
    },
    async addReservation() {
      try {
        this.formData.no_tables_reserver = JSON.parse(
          this.formData.no_tables_reserver
        );
        await apiClient.post("/reservations", this.formData);
        alert("Réservation ajoutée avec succès !");
        this.fetchReservations();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation :", error);
      }
    },
    async updateReservation() {
      try {
        this.formData.no_tables_reserver = JSON.parse(
          this.formData.no_tables_reserver
        );
        await apiClient.put(
          `/reservations/${this.editingReservation.id}`,
          this.formData
        );
        alert("Réservation mise à jour avec succès !");
        this.fetchReservations();
        this.resetForm();
      } catch (error) {
        console.error(
          "Erreur lors de la modification de la réservation :",
          error
        );
      }
    },
    async deleteReservation(id) {
      try {
        await apiClient.delete(`/reservations/${id}`);
        alert("Réservation supprimée avec succès !");
        this.fetchReservations();
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de la réservation :",
          error
        );
      }
    },
    editReservation(reservation) {
      this.editingReservation = reservation;
      this.formData = {
        ...reservation,
        no_tables_reserver: JSON.stringify(reservation.no_tables_reserver),
      };
      this.showAddForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.editingReservation = null;
      this.showAddForm = false;
      this.formData = {
        date: "",
        no_tables_reserver: "",
        nom_client: "",
      };
    },
  },
  mounted() {
    this.fetchReservations();
  },
};
</script>

<style scoped>
.reservations-container {
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
</style>
