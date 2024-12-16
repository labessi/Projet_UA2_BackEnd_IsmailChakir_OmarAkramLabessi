import { client } from "../models/relation.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  // Validation des champs requis
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { prenom, nom, email, motDePasseClient, telephone } = req.body;

  console.log("Données reçues :", { prenom, nom, email, motDePasseClient, telephone });

  if (!prenom || !nom || !email || !motDePasseClient) {
    return res.status(400).json({ message: "Tous les champs requis doivent être remplis." });
  }

  try {
    // Vérifier si l'email existe déjà
    const existingClient = await client.findOne({ where: { email } });
    if (existingClient) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(motDePasseClient, 10);
    console.log("Mot de passe haché :", hashedPassword);

    // Créer le client
    const newClient = await client.create({
      prenom,
      nom,
      email,
      motDePasseClient: hashedPassword,
      telephone,
    });

    console.log("Client créé :", newClient);

    return res.status(201).json({
      message: "Inscription réussie ! Vous pouvez vous connecter.",
      user: { id: newClient.id, prenom: newClient.prenom, email: newClient.email },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
};
