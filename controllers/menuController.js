import menu from "../models/menu.js";

// Créer un menu
export const createMenu = async (req, res) => {
    try {
        const newMenu = await menu.create(req.body);
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir tous les menus
export const getAllMenus = async (req, res) => {
    try {
        const menus = await menu.findAll();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un menu
export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await menu.update(req.body, { where: { id } });
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un menu
export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        await menu.destroy({ where: { id } });
        res.status(200).json({ message: "Menu supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Obtenir un menu spécifique par son ID
export const getMenuById = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Chercher le menu par son ID
        const menuItem = await menu.findOne({ where: { id } });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu non trouvé." });
        }

        // Renvoyer les détails du menu
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
