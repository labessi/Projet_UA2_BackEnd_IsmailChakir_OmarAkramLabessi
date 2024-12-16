import database from "../config/connection.js";
import { DataTypes } from "sequelize";


const admin = database.define('admin', {
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    motDePasseAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
});

export default admin;