import commande from "../models/commande.js";

// Créer une commande
export const createCommande = async (req, res) => {
    try {
        const newCommande = await commande.create(req.body);
        res.status(201).json(newCommande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir toutes les commandes
export const getAllCommandes = async (req, res) => {
    try {
        const commandes = await commande.findAll();
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une commande
export const updateCommande = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await commande.update(req.body, { where: { id } });
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une commande
export const deleteCommande = async (req, res) => {
    try {
        const { id } = req.params;
        await commande.destroy({ where: { id } });
        res.status(200).json({ message: "Commande supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Obtenir une commande spécifique par son ID
export const getCommandeById = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Chercher le menu par son ID
        const commandeItem = await commande.findOne({ where: { id } });

        if (!commandeItem) {
            return res.status(404).json({ message: "Commande non trouvé." });
        }

        // Renvoyer les détails du menu
        res.status(200).json(commandeItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};