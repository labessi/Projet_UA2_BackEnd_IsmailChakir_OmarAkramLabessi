<template>
  <div
    class="not-found d-flex justify-content-center align-items-center vh-100"
  >
    <div class="text-center">
      <h1 class="display-1 fw-bold text-danger">404</h1>
      <p class="lead text-muted">
        Oups ! La page que vous recherchez est introuvable.
      </p>
      <router-link to="/" class="btn btn-primary mt-3 px-4 py-2 fw-bold">
        Retour à l'accueil
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
.not-found {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
}

h1 {
  font-size: 6rem;
  color: #dc3545; /* Rouge pour indiquer une erreur */
}

p {
  font-size: 1.25rem;
}

.btn-primary {
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>
