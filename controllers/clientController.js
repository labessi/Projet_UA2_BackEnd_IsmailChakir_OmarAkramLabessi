import client from "../models/client.js";
import bcrypt from "bcryptjs"
import panier from "../models/panier.js";

// Créer un client et lui attribuer un panier
export const createClient = async (req, res) => {
    try {
        const { prenom, nom, email, motDePasseClient, telephone } = req.body;

        // Vérification si l'email existe déjà
        const existingClient = await client.findOne({ where: { email } });
        if (existingClient) {
            return res.status(400).json({ message: "Cet email est déjà utilisé par un client." });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasseClient, 10);

        // Créer le client
        const newClient = await client.create({
            prenom,
            nom,
            email,
            motDePasseClient: hashedPassword,
            telephone,
        });

        // Créer un panier pour ce client
        const newPanier = await panier.create({
            idClient: newClient.id, // Associer le panier au client
            contenuPanier: [], // Panier vide par défaut
            statut: "actif", // Le statut est actif par défaut
            total: 0.0, // Le total du panier est de 0 au départ
        });

        // Mettre à jour le client avec l'ID du panier dans 'id_panier'
        await newClient.update({ id_panier: newPanier.id });

        // Renvoyer la réponse avec le client et le panier
        return res.status(201).json({
            message: "Client et panier créés avec succès.",
            client: newClient,
            panier: newPanier,
        });
    } catch (error) {
        console.error("Erreur lors de la création du client :", error);
        return res.status(500).json({ error: "Une erreur est survenue lors de la création du client." });
    }
};


export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;

        // Recherche de l'admin par son ID
        const clientData = await client.findOne({ where: { id } });

        if (!clientData) {
            return res.status(404).json({ message: "client non trouvé." });
        }

        // Renvoie des données de l'admin trouvé
        return res.status(200).json(clientData);
    } catch (error) {
        console.error("Erreur lors de la récupération de client :", error);
        return res.status(500).json({ error: "Une erreur est survenue lors de la récupération de client." });
    }
};

// Obtenir tous les clients
export const getAllClients = async (req, res) => {
    try {
        const clients = await client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un client
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await client.update(req.body, { where: { id } });
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        await client.destroy({ where: { id } });
        res.status(200).json({ message: "Client supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
