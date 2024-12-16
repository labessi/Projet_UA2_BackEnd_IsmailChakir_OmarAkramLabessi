import produit from "../models/produit.js";

// Créer un produit
export const createProduit = async (req, res) => {
    try {
        const newProduit = await produit.create(req.body);
        res.status(201).json(newProduit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir tous les produits
export const getAllProduits = async (req, res) => {
    try {
        const produits = await produit.findAll();
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un produit
export const updateProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await produit.update(req.body, { where: { id } });
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un produit
export const deleteProduit = async (req, res) => {
    try {
        const { id } = req.params;
        await produit.destroy({ where: { id } });
        res.status(200).json({ message: "Produit supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir un produit spécifique par son ID
export const getProduitById = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Chercher le menu par son ID
        const produitItem = await produit.findOne({ where: { id } });

        if (!produitItem) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        // Renvoyer les détails du menu
        res.status(200).json(produitItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
