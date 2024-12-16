import admin from "./admin.js";
import client from "./client.js";
import commande from "./commande.js";
import menu from "./menu.js";
import produit from "./produit.js";
import reservation from "./reservation.js";
import table from "./table.js";
import panier from "./panier.js";
import database from "../config/connection.js";
import { DataTypes } from "sequelize";

// Table intermédiaire pour produit <-> commande
const commandeProduit = database.define('commandeProduit', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
});

// Table intermédiaire pour menu <-> commande
const commandeMenu = database.define('commandeMenu', {});

// Table intermédiaire pour menu <-> produit
const menuProduit = database.define('menuProduit', {});

// Relations entre entités

// Client <-> Commande (1-N)
client.hasMany(commande, { foreignKey: 'clientId', as: 'commandes' });
commande.belongsTo(client, { foreignKey: 'clientId', as: 'client' });

// Admin <-> Commande (1-N)
admin.hasMany(commande, { foreignKey: 'adminId', as: 'commandesGérées' });
commande.belongsTo(admin, { foreignKey: 'adminId', as: 'admin' });

// Client <-> Réservation (1-N)
client.hasMany(reservation, { foreignKey: 'clientId', as: 'reservations' });
reservation.belongsTo(client, { foreignKey: 'clientId', as: 'client' });

// Réservation <-> Table (N-M ou 1-N selon besoin)
reservation.belongsToMany(table, { through: 'reservationTable', foreignKey: 'reservationId', as: 'tables' });
table.belongsToMany(reservation, { through: 'reservationTable', foreignKey: 'tableId', as: 'reservations' });

// Produit <-> Commande (N-M)
produit.belongsToMany(commande, { through: commandeProduit, foreignKey: 'produitId', as: 'commandes' });
commande.belongsToMany(produit, { through: commandeProduit, foreignKey: 'commandeId', as: 'produits' });

// Menu <-> Commande (N-M)
menu.belongsToMany(commande, { through: commandeMenu, foreignKey: 'menuId', as: 'commandes' });
commande.belongsToMany(menu, { through: commandeMenu, foreignKey: 'commandeId', as: 'menus' });

// Produit <-> Menu (N-M)
produit.belongsToMany(menu, { through: menuProduit, foreignKey: 'produitId', as: 'menus' });
menu.belongsToMany(produit, { through: menuProduit, foreignKey: 'menuId', as: 'produits' });

//client < -> panier (1-1)
client.hasOne(panier, {
    foreignKey: 'clientId' // clé étrangère qui relie le panier au client
});
panier.belongsTo(client, {
    foreignKey: 'clientId'
});
// Exports des modèles
export { admin, client,panier, commande, menu, produit, reservation, table, commandeProduit, commandeMenu, menuProduit };
