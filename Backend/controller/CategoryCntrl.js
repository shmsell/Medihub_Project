const Category = require('../models/Categorymodel');

// Ajouter une catégorie
const addCategory = async (req, res) => {
    try {
        const { nom, description } = req.body;
        const newCategory = new Category({ nom, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
};

// Obtenir toutes les catégories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
};

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { nom, description }, { new: true });
        if (!updatedCategory) return res.status(404).send('Catégorie non trouvée');
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Correction ici : 'params' et non 'prams'
        // Le reste de la logique pour supprimer la catégorie
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }

        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie', error });
    }
};

module.exports = { addCategory, getAllCategories, updateCategory, deleteCategory };