import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const table = database.define('table', {
    noTable:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    capacite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
});

export default table;