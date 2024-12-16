import { admin, client } from "../models/relation.js";

// Middleware pour vérifier l'autorisation
const autoriser = (roles) => async (req, res, next) => {
    try {
        // Récupérer l'id utilisateur et son rôle depuis le middleware verifierToken
        const userId = req.userId;
        const userRole = req.userRole; // 'admin' ou 'client'

        // Vérifier si le rôle de l'utilisateur est autorisé
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: "Accès interdit : vous n'êtes pas autorisé(e) à accéder à cette ressource." });
        }

        // Vérifier si l'utilisateur existe dans la base de données
        if (userRole === "admin") {
            const adminUser = await admin.findByPk(userId);
            if (!adminUser) {
                return res.status(404).json({ message: "Accès interdit : cet administrateur n'existe pas." });
            }
        } else if (userRole === "client") {
            const clientUser = await client.findByPk(userId);
            if (!clientUser) {
                return res.status(404).json({ message: "Accès interdit : ce client n'existe pas." });
            }
        }

        // Si l'utilisateur est valide, autoriser l'accès
        next();
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};

export default autoriser;
