<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div class="card shadow-lg p-4 rounded border-0">
      <!-- En-tête -->
      <div class="text-center mb-4">
        <i class="bi bi-box-arrow-in-right text-primary display-4"></i>
        <h2 class="fw-bold text-primary mt-2">Restaurant IO</h2>
        <p class="text-muted">Connectez-vous pour continuer</p>
      </div>

      <!-- Formulaire de Connexion -->
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label for="email" class="form-label">Adresse Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div class="form-group mb-3">
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

        <button type="submit" class="btn btn-primary w-100 fw-bold">
          Se connecter
        </button>

        <!-- Message d'erreur -->
        <p v-if="errorMessage" class="text-danger mt-3 text-center">
          {{ errorMessage }}
        </p>
      </form>

      <!-- Pied de page -->
      <div class="text-center mt-4">
        <p class="text-muted">
          Pas encore de compte ?
          <router-link to="/register" class="text-primary fw-bold">
            Inscrivez-vous
          </router-link>
        </p>
        <small class="text-muted">
          © {{ new Date().getFullYear() }} Restaurant IO - Tous droits réservés.
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await apiClient.post("/authentification/login", {
          email: this.email,
          mot_de_passe: this.password,
        });

        const { token, role, prenom } = response.data;

        // Stocker les informations utilisateur dans localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", prenom);

        // Redirection vers la page d'accueil
        this.$router.push("/");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Une erreur est survenue.";
        this.animateError();
      }
    },
    animateError() {
      const card = document.querySelector(".card");
      card.classList.add("shake");
      setTimeout(() => card.classList.remove("shake"), 500);
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f0f4ff, #d9e4ff);
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 400px;
  animation: fadeInUp 0.8s ease-in-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25%,
  75% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
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
