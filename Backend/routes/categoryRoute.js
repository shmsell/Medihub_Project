const express = require('express');
const { addCategory, getAllCategories, updateCategory, deleteCategory } = require('../controller/CategoryCntrl');

const router = express.Router();

// Route pour ajouter une catégorie
router.post('/add', addCategory);

// Route pour obtenir toutes les catégories
router.get('/all', getAllCategories);

// Route pour mettre à jour une catégorie
router.put('/update/:id', updateCategory);

// Route pour supprimer une catégorie
router.delete('/delete/:id', deleteCategory);

module.exports = router;
