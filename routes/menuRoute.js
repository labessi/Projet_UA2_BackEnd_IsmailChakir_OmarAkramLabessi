import express from 'express';
import {
    createMenu,
    getAllMenus,
    updateMenu,
    deleteMenu,
    getMenuById
} from '../controllers/menuController.js';

const router = express.Router();

// Route pour créer un menu
router.post('/', createMenu);

// Route pour obtenir tous les menus
router.get('/', getAllMenus);

// Route pour obtenir un menu spécifique par son ID
router.get('/:id', getMenuById);

// Route pour mettre à jour un menu
router.put('/:id', updateMenu);

// Route pour supprimer un menu
router.delete('/:id', deleteMenu);

export default router;
