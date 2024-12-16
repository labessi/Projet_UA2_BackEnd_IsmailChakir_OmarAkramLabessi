// Importer jwt
import jwt from 'jsonwebtoken';

export const verifierToken = (req, res, next) => {
    // Récupération du token
    const bearerToken = req.headers.authorization;

    // Vérification de la présence du token
    if (!bearerToken) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté(e) !" });
    }

    // Récupérer le token sans la partie "Bearer"
    const token = bearerToken.split(' ')[1];

    jwt.verify(token, process.env.CODE_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide ou expiré !" });
        }

        // Extraire l'id et le rôle du payload
        req.userId = payload.id;
        req.userRole = payload.role; // Par exemple : 'admin' ou 'client'

        next();
    });
};
