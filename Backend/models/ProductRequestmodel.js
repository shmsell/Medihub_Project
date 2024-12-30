const mongoose = require('mongoose');

const productRequestSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true, // Champ requis
            min: 1 // Minimum de 1 pour éviter les demandes de quantité 0
        }
    }],
    status: {
        type: String,
        enum: ['en_attente', 'en_preparation', 'ramasse'],
        default: 'en_attente'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true, // Champ requis
        min: 0 // Pas de prix négatif
    }
});

const ProductRequest = mongoose.model('ProductRequest', productRequestSchema);
module.exports = ProductRequest;
