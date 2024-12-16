// connexion à la base de données
import database from "../config/connection.js";

// types de données
import { DataTypes } from "sequelize";

const panier = database.define('panier',{
    contenuPanier: {
        type: DataTypes.JSON, // Pour stocker une liste d'articles sous forme de JSON
        allowNull: false,
        defaultValue: [] // Panier vide par défaut
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "actif", // Le panier peut être actif, abandonné, ou acheté
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0, // Total du panier (par exemple, somme des prix des articles)
    }
});

export default panier;