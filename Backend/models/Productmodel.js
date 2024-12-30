const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String },
    prix: { type: Number, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
    statut: { type: String, default: 'disponible' }, // Statut du produit
    coverPhoto: { 
        type: String, // URL de la photo de couverture
        required: true 
    },
    gallery: [{ 
        type: String // URLs des photos de la galerie
    }],
});

module.exports = mongoose.model('Product', ProductSchema);
