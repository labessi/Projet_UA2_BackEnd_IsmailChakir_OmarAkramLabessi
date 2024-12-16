import produit from "../models/produit.js";
import menu from "../models/menu.js"
import commande from "../models/commande.js";
import client from "../models/client.js"; 
import panier from "../models/panier.js";

export const getPanierClient = async (req, res) => {
    const { idClient } = req.params;

    try {
        // Récupérer le client et son panier
        const clientData = await client.findOne({
            where: { id: idClient },
            include: {
                model: panier,
                as: 'panier',  // On inclut le panier du client
            }
        });

        if (!clientData) {
            return res.status(404).json({ message: "Client non trouvé." });
        }

        // Renvoyer les informations du panier
        return res.status(200).json({ panier: clientData.panier });
    } catch (error) {
        console.error("Erreur lors de la récupération du panier :", error);
        return res.status(500).json({ message: "Erreur interne." });
    }
};


//ajouter produit au panier
export const ajouterProduitAuPanier = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié." });
        }

        const { idProduit, idMenu, quantite } = req.body; // Récupère les données envoyées
        const clientId = req.userId; // ID du client connecté via le token

        // Récupérer le panier du client connecté
        const clientPanier = await panier.findOne({ where: { clientId } }); // Utilisez 'clientId'

        if (!clientPanier) {
            return res.status(404).json({ message: "Panier non trouvé pour ce client." });
        }

        // Ajouter un produit ou un menu au panier
        if (idProduit) {
            const produitSelectionne = await produit.findByPk(idProduit);
            if (!produitSelectionne) {
                return res.status(404).json({ message: "Produit non trouvé." });
            }

            await clientPanier.addProduit(produitSelectionne, { through: { quantite } });
        }

        if (idMenu) {
            const menuSelectionne = await menu.findByPk(idMenu);
            if (!menuSelectionne) {
                return res.status(404).json({ message: "Menu non trouvé." });
            }

            await clientPanier.addMenu(menuSelectionne, { through: { quantite } });
        }

        return res.status(200).json({ message: "Article ajouté au panier avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier :", error);
        return res.status(500).json({ message: "Erreur interne." });
    }
};


// ajouter menu au panier
export const ajouterMenuAuPanier = async (req, res) => {
    const { clientId, menuId, quantite } = req.body;

    try {
        // Vérifier si le menu existe
        const menuData = await menu.findByPk(menuId);
        if (!menuData) {
            return res.status(404).json({ message: "Menu non trouvé." });
        }

        // Vérifier si le panier existe pour ce client
        const panierClient = await panier.findOne({ where: { clientId } });
        if (!panierClient) {
            return res.status(404).json({ message: "Panier non trouvé pour ce client." });
        }

        // Ajouter le menu au panier
        panierClient.contenuPanier.push({ menuId, quantite });
        panierClient.total += menuData.prix * quantite;

        // Sauvegarder le panier mis à jour
        await panierClient.save();

        return res.status(200).json({ message: "Menu ajouté au panier", panier: panierClient });
    } catch (error) {
        console.error("Erreur lors de l'ajout du menu au panier:", error);
        return res.status(500).json({ message: "Erreur interne." });
    }
};


// supprimer produit du panier 
export const supprimerProduitDuPanier = async (req, res) => {
    const { clientId, produitId } = req.body;

    try {
        const panierClient = await panier.findOne({ where: { clientId } });
        if (!panierClient) {
            return res.status(404).json({ message: "Panier non trouvé pour ce client." });
        }

        // Trouver et retirer le produit du panier
        panierClient.contenuPanier = panierClient.contenuPanier.filter(item => item.produitId !== produitId);

        // Mettre à jour le total du panier
        const produitData = await produit.findByPk(produitId);
        panierClient.total -= produitData.prix;

        await panierClient.save();
        return res.status(200).json({ message: "Produit supprimé du panier", panier: panierClient });
    } catch (error) {
        console.error("Erreur lors de la suppression du produit du panier:", error);
        return res.status(500).json({ message: "Erreur interne." });
    }
};

export const supprimerMenuDuPanier = async (req, res) => {
    const { clientId, menuId } = req.body;

    try {
        const panierClient = await panier.findOne({ where: { clientId } });
        if (!panierClient) {
            return res.status(404).json({ message: "Panier non trouvé pour ce client." });
        }

        // Retirer le menu du panier
        panierClient.contenuPanier = panierClient.contenuPanier.filter(item => item.menuId !== menuId);

        // Mettre à jour le total du panier
        const menuData = await menu.findByPk(menuId);
        panierClient.total -= menuData.prix;

        await panierClient.save();
        return res.status(200).json({ message: "Menu supprimé du panier", panier: panierClient });
    } catch (error) {
        console.error("Erreur lors de la suppression du menu du panier:", error);
        return res.status(500).json({ message: "Erreur interne." });
    }
};



export const passerCommande = async (req, res) => {
    const { clientId } = req.body;

    try {
        const panierClient = await panier.findOne({ where: { clientId } });
        if (!panierClient || panierClient.contenuPanier.length === 0) {
            return res.status(400).json({ message: "Le panier est vide." });
        }

        // Créer la commande avec le contenu du panier
        const newCommande = await commande.create({
            clientId: clientId,
            contenuCommande: panierClient.contenuPanier,
            coutTotal: panierClient.total,
            statut: "processing",
        });

        // Vider le panier après la commande
        panierClient.contenuPanier = [];
        panierClient.total = 0;
        await panierClient.save();

        return res.status(201).json({ message: "Commande passée avec succès", commande: newCommande });
    } catch (error) {
        console.error("Erreur lors de la passation de la commande:", error);
        return res.status(500).json({ message: "Erreur interne." });
    }
};
