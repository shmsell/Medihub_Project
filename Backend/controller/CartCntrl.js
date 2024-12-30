// controllers/cartController.js
const Cart = require('../models/Cartmodel');
const Product = require('../models/Productmodel');
const asyncHandler = require('express-async-handler');

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Récupérer l'utilisateur connecté grâce au token JWT

  if (!productId) {
    return res.status(400).json({ error: 'L\'ID du produit est requis' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    // Chercher le panier de l'utilisateur
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Si le panier n'existe pas, en créer un nouveau
      cart = new Cart({ userId, items: [] });
    }

    // Vérifier si le produit est déjà dans le panier
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Si le produit est déjà dans le panier, augmenter la quantité
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      // Sinon, ajouter le produit au panier
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json({ message: 'Produit ajouté au panier avec succès', cart });
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit au panier' });
  }
});
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Trouver le panier de l'utilisateur
    const cart = await Cart.findOne({ userId }).populate('items.productId');  // Utiliser populate pour récupérer les détails du produit

    if (!cart) {
      return res.status(404).json({ message: 'Panier vide' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Récupérer l'utilisateur connecté grâce au token JWT

  if (!productId) {
    return res.status(400).json({ error: 'L\'ID du produit est requis' });
  }

  try {
    // Chercher le panier de l'utilisateur
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' });
    }

    // Vérifier si le produit est dans le panier
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Si le produit est trouvé, le supprimer
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({ message: 'Produit supprimé du panier avec succès', cart });
    } else {
      return res.status(404).json({ error: 'Produit non trouvé dans le panier' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du produit du panier:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du produit du panier' });
  }
});



module.exports = {
  addToCart,
  getCart,
  removeFromCart };
