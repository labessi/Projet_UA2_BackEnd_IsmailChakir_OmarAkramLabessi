<template>
  <div
    class="register-container d-flex justify-content-center align-items-center"
  >
    <div class="card shadow-lg p-4 rounded border-0">
      <!-- En-tête -->
      <div class="text-center mb-4">
        <h2 class="fw-bold text-primary">Inscription</h2>
        <p class="text-muted">Créez votre compte pour accéder à nos services</p>
      </div>

      <!-- Formulaire d'inscription -->
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="prenom" class="form-label">Prénom</label>
          <input
            v-model="prenom"
            type="text"
            id="prenom"
            class="form-control"
            placeholder="Entrez votre prénom"
            required
          />
        </div>
        <div class="mb-3">
          <label for="nom" class="form-label">Nom</label>
          <input
            v-model="nom"
            type="text"
            id="nom"
            class="form-control"
            placeholder="Entrez votre nom"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <div class="mb-4">
          <label for="telephone" class="form-label">Téléphone</label>
          <input
            v-model="telephone"
            type="text"
            id="telephone"
            class="form-control"
            placeholder="Entrez votre numéro de téléphone (optionnel)"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100 fw-bold">
          S'inscrire
        </button>

        <!-- Message d'erreur -->
        <p v-if="errorMessage" class="text-danger mt-3 text-center">
          {{ errorMessage }}
        </p>
      </form>

      <!-- Pied de page -->
      <div class="text-center mt-4">
        <p class="text-muted">
          Déjà un compte ?
          <router-link to="/login" class="text-primary fw-bold">
            Connectez-vous
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/axios";

export default {
  name: "RegisterView",
  data() {
    return {
      prenom: "",
      nom: "",
      email: "",
      password: "",
      telephone: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        await api.post("/authentification/register", {
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          motDePasseClient: this.password,
          telephone: this.telephone,
        });
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Une erreur est survenue.";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f0f4ff, #d9e4ff);
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
}

.form-control {
  border-radius: 6px;
  padding: 10px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>
