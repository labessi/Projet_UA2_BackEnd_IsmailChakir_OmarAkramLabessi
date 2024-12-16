import { createRouter, createWebHistory } from "vue-router";

// Importation des vues
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
// Vues pour les Clients
import ProduitsClientView from "../views/ProduitsClientView.vue";
import ReservationsClientView from "../views/ReservationsClientView.vue";
import CommandesClientView from "../views/CommandesClientView.vue";
import PanierClientView from "../views/PanierClientView.vue";

// Vues pour les Admins
import MenusView from "../views/MenusView.vue";
import ProduitsView from "../views/ProduitsView.vue";
import ClientsView from "../views/ClientsView.vue";
import TablesView from "../views/TablesView.vue";
import ReservationsView from "../views/ReservationsView.vue";
import CommandesView from "../views/CommandesView.vue";

// Vue Not Found
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  // Routes communes
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },

  // Routes Admin
  {
    path: "/menus",
    name: "menus",
    component: MenusView,
    beforeEnter: adminGuard,
  },
  {
    path: "/produits",
    name: "produits",
    component: ProduitsView,
    beforeEnter: adminGuard,
  },
  {
    path: "/clients",
    name: "clients",
    component: ClientsView,
    beforeEnter: adminGuard,
  },
  {
    path: "/tables",
    name: "tables",
    component: TablesView,
    beforeEnter: adminGuard,
  },
  {
    path: "/reservations",
    name: "reservations",
    component: ReservationsView,
    beforeEnter: adminGuard,
  },
  {
    path: "/commandes",
    name: "commandes",
    component: CommandesView,
    beforeEnter: adminGuard,
  },

  // Routes Client
  {
    path: "/produits-client",
    name: "produits-client",
    component: ProduitsClientView,
  },
  {
    path: "/reservations-client",
    name: "reservations-client",
    component: ReservationsClientView,
  },
  {
    path: "/commandes-client",
    name: "commandes-client",
    component: CommandesClientView,
  },
  {
    path: "/panier-client",
    name: "panier-client",
    component: PanierClientView,
  },

  // Route Not Found
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
];

// Gardien de navigation pour les pages Admin
function adminGuard(to, from, next) {
  const role = localStorage.getItem("userRole");
  if (role === "admin") {
    next();
  } else {
    alert("Accès interdit. Seul un admin peut accéder à cette page.");
    next("/login");
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
