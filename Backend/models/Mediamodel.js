const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    url: { type: String, required: true }, // URL de l'image ou du fichier
    type: { type: String, required: true }, // 'image', 'video', etc.
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Référence au produit
});

module.exports = mongoose.model('Media', MediaSchema); 