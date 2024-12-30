const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modèle de commande
const OrderSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart', // Référence au modèle Cart
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['en_attente', 'expédié', 'livré', 'annulé'],
    default: 'en_attente'
  },
  shippingAddress: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
  },
  paymentMethod: {
    type: String,
    default: 'espèces' // Paiement par espèces par défaut
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Order', OrderSchema);
