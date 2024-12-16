import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const produit = database.define('produit', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    prix: {
        type: DataTypes.DECIMAL(10, 2), // Pour des valeurs monétaires avec 2 décimales
        allowNull: false,
        
    }
});

export default produit;