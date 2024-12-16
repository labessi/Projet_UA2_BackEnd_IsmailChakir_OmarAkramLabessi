<template>
  <div class="reservations container mt-5">
    <h1 class="text-center mb-4 text-primary">Vos Réservations</h1>

    <!-- Formulaire pour faire une nouvelle réservation -->
    <form
      @submit.prevent="addReservation"
      class="reservation-form p-4 shadow rounded bg-white mb-5"
    >
      <h3 class="text-center text-dark mb-4">Ajouter une Réservation</h3>
      <div class="mb-3">
        <label for="date" class="form-label">Date :</label>
        <input
          v-model="newReservation.date"
          id="date"
          type="date"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="no_tables_reserver" class="form-label"
          >Numéro(s) de Table(s) :</label
        >
        <input
          v-model="newReservation.no_tables_reserver"
          id="no_tables_reserver"
          type="text"
          class="form-control"
          placeholder="Ex : 1,2,3"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">
        Ajouter Réservation
      </button>
    </form>

    <!-- Tableau des réservations -->
    <div class="table-responsive shadow rounded bg-white p-3">
      <table class="table table-striped">
        <thead class="table-primary">
          <tr>
            <th>Date</th>
            <th>Tables Réservées</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id">
            <td>{{ formatDate(reservation.date) }}</td>
            <td>{{ formatTables(reservation.no_tables_reserver) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="reservations.length === 0" class="text-center text-muted">
        Vous n'avez aucune réservation pour le moment.
      </p>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "ReservationsClientView",
  data() {
    return {
      reservations: [],
      newReservation: {
        date: "",
        no_tables_reserver: "", // Champ pour entrer les tables
      },
    };
  },
  methods: {
    // Formater la date pour l'affichage
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    // Convertir les tables réservées pour un affichage propre
    formatTables(tables) {
      return Array.isArray(tables) ? tables.join(", ") : tables;
    },

    // Récupérer les réservations existantes
    async fetchReservations() {
      try {
        const clientName = localStorage.getItem("userName");
        if (!clientName) {
          console.error("Nom du client manquant dans localStorage.");
          return;
        }

        const response = await apiClient.get(
          `/reservations/by-client?nom_client=${clientName}`
        );
        this.reservations = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des réservations :", error);
      }
    },

    // Ajouter une nouvelle réservation
    async addReservation() {
      try {
        const clientName = localStorage.getItem("userName");
        if (!clientName) {
          alert("Erreur : nom du client manquant.");
          return;
        }

        const response = await apiClient.post("/reservations", {
          date: this.newReservation.date,
          no_tables_reserver: this.newReservation.no_tables_reserver
            .split(",")
            .map((t) => t.trim()), // Convertir en tableau
          nom_client: clientName,
        });

        // Ajouter la nouvelle réservation dans la liste affichée
        this.reservations.push(response.data);

        // Réinitialiser le formulaire
        this.newReservation.date = "";
        this.newReservation.no_tables_reserver = "";
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation :", error);
      }
    },
  },
  mounted() {
    this.fetchReservations();
  },
};
</script>

<style scoped>
.reservation-form {
  border: 1px solid #ddd;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
