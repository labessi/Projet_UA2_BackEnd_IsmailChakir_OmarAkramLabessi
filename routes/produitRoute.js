import express from 'express';
import { verifierToken } from "../authentification/verifierToken.js";
import { verifierRole } from "../authentification/verifierRole.js";
import {
  createProduit,
  getAllProduits,
  updateProduit,
  deleteProduit,
  getProduitById,
} from '../controllers/produitController.js';

const router = express.Router();

// Routes pour gérer les produits
router.get('/', getAllProduits); // Obtenir tous les produits
router.get('/:id', getProduitById); // Obtenir un produit par ID
router.post('/', createProduit); // Ajouter un produit
router.put('/:id', updateProduit); // Mettre à jour un produit
router.delete('/:id', deleteProduit); // Supprimer un produit

export default router;
