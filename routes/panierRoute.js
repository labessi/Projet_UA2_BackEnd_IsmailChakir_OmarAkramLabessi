import express from "express";
import {
  getPanierClient,
  ajouterProduitAuPanier,
  ajouterMenuAuPanier,
  supprimerProduitDuPanier,
  supprimerMenuDuPanier,
  passerCommande,
} from "../controllers/panierController.js";

import { verifierToken } from "../authentification/verifierToken.js";

const router = express.Router();

// Routes protégées par le middleware `verifierToken`
router.use(verifierToken);

// Obtenir le panier du client connecté
router.get("/:idClient", getPanierClient);

// Ajouter un produit ou un menu au panier
router.post("/ajouter-produit", ajouterProduitAuPanier);
router.post("/ajouter-menu", ajouterMenuAuPanier);

// Supprimer un produit ou un menu du panier
router.delete("/supprimer-produit", supprimerProduitDuPanier);
router.delete("/supprimer-menu", supprimerMenuDuPanier);

// Passer une commande à partir du panier
router.post("/passer-commande", passerCommande);

export default router;
