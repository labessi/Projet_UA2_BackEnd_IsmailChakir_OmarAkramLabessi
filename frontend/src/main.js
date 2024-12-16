import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"; // Importer Pinia
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App);

// Créer une instance de Pinia
const pinia = createPinia();

// Utiliser Pinia et le routeur dans l'application
app.use(pinia);
app.use(router);

app.mount("#app");
