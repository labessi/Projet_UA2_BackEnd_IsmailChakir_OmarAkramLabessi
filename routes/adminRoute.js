import { Router } from "express";
import {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
    getAdminById,
} from "../controllers/adminController.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autorisation.js";

const router = Router();

// Routes pour gérer les admins
router
    .post("/", verifierToken, autoriser(["admin"]), createAdmin) // Créer un admin (uniquement pour les admins connectés)
    .get("/", verifierToken, autoriser(["admin"]), getAllAdmins) // Récupérer tous les admins
    .get("/:id", verifierToken, autoriser(["admin"]), getAdminById) // Récupérer un admin par ID
    .put("/:id", verifierToken, autoriser(["admin"]), updateAdmin) // Mettre à jour un admin
    .delete("/:id", verifierToken, autoriser(["admin"]), deleteAdmin); // Supprimer un admin

export default router;