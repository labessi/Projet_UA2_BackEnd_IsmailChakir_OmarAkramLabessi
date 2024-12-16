import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import panier from "./panier.js"

const client = database.define('client', {
    prenom: {
        type: DataTypes.STRING,
        allowNull: false, // First name is mandatory
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false, // Last name is mandatory
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email uniqueness
    },
    telephone: {
        type: DataTypes.STRING, // Consider using a specialized phone number type if available
    },
    motDePasseClient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_panier: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: panier, // La référence à la table panier
            key: 'id', // Clé primaire du panier
        }
    }
});

export default client;