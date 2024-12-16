import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const reservation = database.define("reservation", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  no_tables_reserver: {
    type: DataTypes.TEXT, // Ou DataTypes.JSON si supporté
    allowNull: false,
    get() {
      const value = this.getDataValue("no_tables_reserver");
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue("no_tables_reserver", JSON.stringify(value));
    },
  },
  nom_client: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default reservation;
