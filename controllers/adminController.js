import admin from "../models/admin.js";
import bcrypt from "bcryptjs"

// Créer un administrateur
export const createAdmin = async (req, res) => {
    try {
        const { prenom, nom, email, motDePasseAdmin } = req.body;

        // Vérification si l'email existe déjà
        const existingAdmin = await admin.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ message: "Cet email est déjà utilisé par un admin." });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasseAdmin, 10);

        // Création du client
        const newAdmin = await admin.create({
            prenom,
            nom,
            email,
            motDePasseAdmin: hashedPassword,
        });
        return res.status(201).json({
            message: "Admin ajouté avec succès.",
            admin: newAdmin,
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout du admin :", error);
        return res.status(500).json({ error: "Une erreur est survenue lors de l'ajout du admin." });
    }
};

// Obtenir tous les administrateurs
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir un administrateur par son ID
export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        // Recherche de l'admin par son ID
        const adminData = await admin.findOne({ where: { id } });

        if (!adminData) {
            return res.status(404).json({ message: "Admin non trouvé." });
        }

        // Renvoie des données de l'admin trouvé
        return res.status(200).json(adminData);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'admin :", error);
        return res.status(500).json({ error: "Une erreur est survenue lors de la récupération de l'admin." });
    }
};



// Mettre à jour un administrateur
export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await admin.update(req.body, { where: { id } });
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un administrateur
export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        await admin.destroy({ where: { id } });
        res.status(200).json({ message: "Admin supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
