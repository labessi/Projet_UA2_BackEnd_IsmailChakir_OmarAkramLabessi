import express from "express";
import { login } from "../authentification/login.js";
import { register } from "../controllers/register.js";
import { body } from "express-validator";

const router = express.Router();

// Route pour la connexion
router.post("/login", login);

// Route pour l'inscription avec validation des champs
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email invalide."),
    body("motDePasseClient").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  ],
  register
);

export default router;
