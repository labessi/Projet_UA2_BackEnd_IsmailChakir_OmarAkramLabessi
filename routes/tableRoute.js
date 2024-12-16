import express from 'express';
import {
  getAllTables,
  createTable,
  updateTable,
  deleteTable,
  getTableById
} from '../controllers/tableController.js';

const router = express.Router();

// Route pour obtenir toutes les tables
router.get('/', getAllTables);

// Route pour obtenir une table spécifique par ID
router.get('/:id', getTableById);

// Route pour ajouter une nouvelle table
router.post('/', createTable);

// Route pour mettre à jour une table existante par ID
router.put('/:id', updateTable);

// Route pour supprimer une table par ID
router.delete('/:id', deleteTable);

export default router;
