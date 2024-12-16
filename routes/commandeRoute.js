// Importer la fonction Router pour la création des routes
import { Router } from "express";
import {
    createCommande,
    getAllCommandes,
    updateCommande,
    getCommandeById,
    deleteCommande
    
} from "../controllers/commandeController.js";

import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autorisation.js";

// Création d'une instance de Router
const route = Router();

// Définir les routes pour les commandes
route
    // Protéger toutes les routes avec le middleware `verifierToken`
    .all("*", verifierToken)

    // Obtenir toutes les commandes (accessible uniquement pour les admins)
    .get("/", autoriser(["admin"]), getAllCommandes)

    //Obtenir une Commande specifique
    .get("/:id",autoriser(["admin"]),getCommandeById)

    // Créer une nouvelle commande (accessible aux clients et aux admins)
    .post("/", autoriser(["admin"]), createCommande)

    // Mettre à jour une commande spécifique (accessible uniquement pour les admins)
    .put("/:id", autoriser(["admin"]), updateCommande)

    // Supprimer une commande spécifique (accessible uniquement pour les admins)
    .delete("/:id", autoriser(["admin"]),deleteCommande );

// Exporter les routes
export default route;
