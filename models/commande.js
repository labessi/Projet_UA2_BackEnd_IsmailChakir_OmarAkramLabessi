// connexion à la base de données
import database from "../config/connection.js";

// types de données
import { DataTypes } from "sequelize";

// Modèle de commande (Order en anglais pour plus de clarté)
const commande = database.define('commande', {
    idClient:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY, // Pour une date sans heure
        allowNull: false, // La date est obligatoire
    },
    heure: {
        type: DataTypes.TIME,
        allowNull: false, // L'heure est obligatoire
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'canceled'),
        allowNull: false,
        defaultValue: 'pending', // État par défaut
    },
    coutTotal: {
        type: DataTypes.DECIMAL(10, 2), // Pour des valeurs monétaires avec 2 décimales
        allowNull: false,
    },
});

export default commande;