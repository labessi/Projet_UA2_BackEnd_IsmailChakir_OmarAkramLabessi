import express from "express";
import {
  createReservation,
  getAllReservations,
  updateReservation,
  deleteReservation,
  getReservationById,
  getReservationsByClient,
} from "../controllers/reservationController.js";

const router = express.Router();

// Routes connectées aux contrôleurs
router.get("/", getAllReservations); // Obtenir toutes les réservations
router.get("/by-client", getReservationsByClient); // Obtenir les réservations par client
router.get("/:id", getReservationById); // Obtenir une réservation par ID
router.post("/", createReservation); // Créer une nouvelle réservation
router.put("/:id", updateReservation); // Mettre à jour une réservation existante
router.delete("/:id", deleteReservation); // Supprimer une réservation par ID

export default router;
