import express from "express";
import compression from "compression";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Importer la connexion à la base de données
import connection from "./config/connection.js";

// Importer les fichiers de routes
import clientRoute from "./routes/clientRoute.js";
import adminRoute from "./routes/adminRoute.js";
import commandeRoute from "./routes/commandeRoute.js";
import menuRoute from "./routes/menuRoute.js";
import produitRoute from "./routes/produitRoute.js";
import reservationRoute from "./routes/reservationRoute.js";
import tableRoute from "./routes/tableRoute.js";
import authentificationRoute from "./routes/authentificationRoute.js";
import panierRoute from "./routes/panierRoute.js";

// Charger les variables d'environnement
dotenv.config();

// Création du serveur
const app = express();

// Utilisation des middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Définir les routes
app.use("/api/clients", clientRoute);
app.use("/api/admins", adminRoute);
app.use("/api/commandes", commandeRoute);
app.use("/api/menus", menuRoute);
app.use("/api/produits", produitRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/tables", tableRoute);
app.use("/api/authentification", authentificationRoute);
app.use("/api/panier", panierRoute);

// Route racine (pour tester si le serveur répond correctement)
app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur l'API ! 🚀");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Vérifier la connexion à la base de données
    await connection.authenticate();
    console.log("✅ Connexion à la base de données réussie !");

    // Synchroniser les tables (ajuster sans perte de données)
    await connection.sync({ alter: true });
    console.log("✅ Les tables ont été synchronisées avec succès !");

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré avec succès sur le port ${PORT}`);
      console.log(`🌐 API disponible à http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error.message);
    process.exit(1); // Terminer l'application en cas d'erreur critique
  }
})();
