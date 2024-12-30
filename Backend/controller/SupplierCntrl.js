const asyncHandler = require('express-async-handler');
const Supplier = require('../models/Suppliermodel');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../config/jawtoken");
const { generateRefreshToken } = require("../config/refreshtoken");
const ProductRequest = require('../models/ProductRequestmodel');
const Product = require('../models/Productmodel');



// Créer un fournisseur ----------------------------------------------
const createSupplier = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findSupplier = await Supplier.findOne({ email: email });

    if (!findSupplier) {
        const newSupplier = await Supplier.create({
            ...req.body,
            statut: 'en_attente', // Statut par défaut pour un nouveau fournisseur
        });
        res.status(201).json({
            message: 'Inscription réussie. Un administrateur doit approuver votre compte.',
            supplier: newSupplier
        });
    } else {
        res.status(400);
        throw new Error("Supplier Already Exists");
    }
});
// Connexion d'un fournisseur ----------------------------------------
// Fonction de connexion des fournisseurs
const loginSupplier = asyncHandler(async (req, res) => {
    const { email, motDePasse } = req.body;

    // Vérifier si le fournisseur existe
    const findSupplier = await Supplier.findOne({ email });
    if (findSupplier) {
        // Vérifier le mot de passe
        if (await findSupplier.comparePassword(motDePasse)) {
            // Vérifier le statut du fournisseur
            if (findSupplier.statut === 'accepté') {
                // Générer un token de rafraîchissement
                const refreshToken = await generateRefreshToken(findSupplier._id);
                
                // Mettre à jour le fournisseur avec le token de rafraîchissement
                const updatedSupplier = await Supplier.findByIdAndUpdate(
                    findSupplier._id,
                    { refreshToken: refreshToken },
                    { new: true }
                );

                // Envoyer le token de rafraîchissement dans un cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 72 * 60 * 60 * 1000, // 72 heures
                });

                // Envoyer la réponse avec le token d'accès et les informations du fournisseur
                res.json({
                    _id: updatedSupplier._id,
                    nomEntreprise: updatedSupplier.nomEntreprise,
                    email: updatedSupplier.email,
                    numeroTelephone: updatedSupplier.numeroTelephone,
                    adresse: updatedSupplier.adresse,
                    token: generateToken(updatedSupplier._id), // Générer un token JWT
                });
            } else {
                // Si le statut est 'rejeté'
                res.status(403).json({ error: "Votre compte a été rejeté. Contactez-nous pour plus d'informations." });
            }
        } else {
            // Si les informations de connexion sont invalides
            res.status(401);
            throw new Error("Invalid Credentials");
        }
    } else {
        // Si le fournisseur n'existe pas
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});


// Récupérer tous les fournisseurs -------------------------------
const getAllSuppliers = asyncHandler(async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des fournisseurs", error: error.message });
    }
});
const getOrdersForSupplier = async (req, res) => {
    try {
        const supplierId = req.user.id;
        if (!supplierId) {
            return res.status(400).json({ error: 'Fournisseur non authentifié' });
        }

        console.log('ID du fournisseur authentifié:', supplierId);

        // Vérification de l'existence des produits associés à ce fournisseur
        const products = await Product.find({ supplier: supplierId });
        console.log(`Produits pour le fournisseur ${supplierId}:`, products);

        if (products.length === 0) {
            return res.status(404).json({ message: "Aucun produit trouvé pour ce fournisseur." });
        }

        // Récupération des commandes
        const orders = await ProductRequest.find({ 'products.productId': { $in: products.map(p => p._id) } })
            .populate('products.productId')
            .exec();

        console.log(`Nombre de commandes récupérées pour le fournisseur ${supplierId}:`, orders.length);

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Aucune demande trouvée.' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        res.status(500).json({ error: error.message });
    }
};
// Accepter un fournisseur ---------------------------------------
const acceptSupplier = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByIdAndUpdate(id, { statut: 'accepté' }, { new: true });
        if (!supplier) return res.status(404).send('Fournisseur non trouvé');
        res.json(supplier);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

// Rejeter un fournisseur ----------------------------------------
const rejectSupplier = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByIdAndUpdate(id, { statut: 'rejeté' }, { new: true });
        if (!supplier) return res.status(404).send('Fournisseur non trouvé');
        res.json(supplier);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});
const countSuppliers = asyncHandler(async (req, res) => {
    try {
      const supplierCount = await Supplier.countDocuments();
      res.status(200).json({ count: supplierCount });
    } catch (error) {
      console.error('Erreur lors du comptage des fournisseurs:', error);
      res.status(500).send('Erreur lors du comptage des fournisseurs');
    }
  });
module.exports = { createSupplier,
    loginSupplier,
    getAllSuppliers , 
    acceptSupplier,
    rejectSupplier,
    countSuppliers,
    getOrdersForSupplier
};
