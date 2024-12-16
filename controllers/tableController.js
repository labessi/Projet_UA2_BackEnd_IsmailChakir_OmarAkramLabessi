import table from "../models/table.js";

// Créer une table
export const createTable = async (req, res) => {
    try {
        const newTable = await table.create(req.body);
        res.status(201).json(newTable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir toutes les tables
export const getAllTables = async (req, res) => {
    try {
        const tables = await table.findAll();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une table
export const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await table.update(req.body, { where: { id } });
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une table
export const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        await table.destroy({ where: { id } });
        res.status(200).json({ message: "Table supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir un menu spécifique par son ID
export const getTableById = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Chercher le menu par son ID
        const Table = await table.findOne({ where: { id } });

        if (!Table) {
            return res.status(404).json({ message: "Table non trouvé." });
        }

        // Renvoyer les détails du menu
        res.status(200).json(Table);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
