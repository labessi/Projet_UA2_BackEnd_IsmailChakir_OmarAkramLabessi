import { client, admin } from "../models/relation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ message: "L'email et le mot de passe sont requis." });
    }

    try {
        let user = null;
        let userType = "";

        console.log("Recherche de l'utilisateur par email :", email);

        // Recherche de l'utilisateur dans la table des admins
        user = await admin.findOne({ where: { email } });
        if (user) {
            userType = "admin";
        } else {
            // Si non trouvé dans les admins, rechercher dans les clients
            user = await client.findOne({ where: { email } });
            if (user) {
                userType = "client";
            }
        }

        // Si l'utilisateur n'existe pas dans les deux tables
        if (!user) {
            console.error("Utilisateur non trouvé :", email);
            return res.status(404).json({ message: "L'utilisateur n'existe pas." });
        }

        console.log("Utilisateur trouvé :", { userType, email });

        // Vérification si le mot de passe existe dans l'objet user
        const passwordField = userType === "admin" ? "motDePasseAdmin" : "motDePasseClient";
        if (!user[passwordField]) {
            console.error("Le mot de passe est manquant dans la base de données :", email);
            return res.status(400).json({ message: "Le mot de passe est manquant dans la base de données." });
        }

        // Vérification du mot de passe
        const mdpCorrect = await bcrypt.compare(mot_de_passe, user[passwordField]);
        if (!mdpCorrect) {
            console.error("Mot de passe incorrect pour :", email);
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        console.log("Mot de passe valide :", email);

        // Création du token
        const payload = { id: user.id, role: userType };
        const token = jwt.sign(payload, process.env.CODE_SECRET, { expiresIn: "1h" });

        console.log("Connexion réussie, token généré :", token);

        // Réponse avec les données de l'utilisateur et le token
        res.status(200).json({
            data: { id: user.id, prenom: user.prenom, nom: user.nom, email: user.email },
            token,
            role: userType
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Une erreur est survenue lors de la connexion." });
    }
};
