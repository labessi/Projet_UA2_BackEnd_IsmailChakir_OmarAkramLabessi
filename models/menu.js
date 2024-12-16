import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const menu = database.define('menu', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Assure l'unicité du nom du menu
    },
    description: {
        type: DataTypes.TEXT, // Pour des descriptions plus longues
        allowNull: true, // La description peut être facultative
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Par défaut, un menu est actif
    }
});

export default menu;