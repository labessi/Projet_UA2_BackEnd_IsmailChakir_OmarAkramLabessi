import { Router } from "express";
import {
    createClient,
    getAllClients,
    updateClient,
    deleteClient,
    getClientById
} from "../controllers/clientController.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autorisation.js";

const route = Router();

// Route publique pour créer un client
route.post("/", createClient);

// Middleware pour protéger toutes les routes suivantes
route.use(verifierToken);

// Routes protégées (requièrent un token et un rôle admin)
route.get("/", autoriser(["admin"]), getAllClients);
route.get("/:id", autoriser(["admin"]), getClientById);
route.put("/:id", autoriser(["admin"]), updateClient);
route.delete("/:id", autoriser(["admin"]), deleteClient);

export default route;
