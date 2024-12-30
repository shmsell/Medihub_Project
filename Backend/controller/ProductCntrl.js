const asyncHandler = require('express-async-handler');
const Product = require('../models/Productmodel');
const upload = require('../utils/uplod'); // Assurez-vous que la configuration est correcte

// Ajouter un produit
const addProduct = asyncHandler(async (req, res) => {
    try {
        // Utiliser Multer pour gérer l'upload de fichier (image de couverture)
        upload.fields([{ name: 'coverPhoto', maxCount: 1 }, { name: 'gallery', maxCount: 10 }])(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            
            const { nom, description, prix, category } = req.body;
            const supplierId = req.user.id;
    
            if (!supplierId) {
                return res.status(400).json({ error: 'ID du fournisseur manquant' });
            }
    
            // Récupérer le chemin de l'image de couverture
            const coverPhoto = req.files['coverPhoto'] ? req.files['coverPhoto'][0].filename : null;

            // Récupérer les images de la galerie (si elles existent)
            const gallery = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : [];
    
            const newProduct = new Product({
                nom,
                description,
                prix,
                category,
                supplier: supplierId,
                statut: 'en_attente',
                coverPhoto,
                gallery,
            });
    
            await newProduct.save();
            res.status(201).json({ message: 'Produit ajouté avec succès', product: newProduct });
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
    }
});
const getAllProducts = asyncHandler(async (req, res) => {
  try {
      const products = await Product.find().populate('category').populate('supplier');
      res.status(200).json(products);
  } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});
// Accepter un produit
const acceptProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifie si l'ID du produit est bien formaté
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'ID de produit non valide' });
    }

    // Met à jour le produit avec le statut accepté
    const product = await Product.findByIdAndUpdate(
      id,
      { statut: 'accepté' },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.status(200).json({ message: 'Produit accepté avec succès', product });
  } catch (error) {
    console.error('Erreur lors de l\'acceptation du produit:', error);

    // Distinguer les types d'erreurs
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Format d\'ID incorrect' });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Erreur de validation des données', details: error.errors });
    } else if (error.name === 'MongoNetworkError') {
      return res.status(503).json({ error: 'Problème de connexion à la base de données' });
    } else {
      res.status(500).json({ error: 'Erreur serveur lors de l\'acceptation du produit' });
    }
  }
});


// Rejeter un produit
const rejectProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
      const product = await Product.findByIdAndUpdate(
          id,
          { statut: 'rejeté' },
          { new: true }
      );

      if (!product) {
          return res.status(404).json({ error: 'Produit non trouvé' });
      }

      res.status(200).json({ message: 'Produit rejeté avec succès', product });
  } catch (error) {
      console.error('Erreur lors du rejet du produit:', error);
      res.status(500).json({ error: 'Erreur lors du rejet du produit' });
  }
});
// Récupérer uniquement les produits avec le statut "accepté"
const getAcceptedProducts = asyncHandler(async (req, res) => {
  try {
      // Rechercher les produits dont le statut est "accepté"
      const acceptedProducts = await Product.find({ statut: 'accepté' });

      // Vérifier si des produits ont été trouvés
      if (acceptedProducts.length === 0) {
          return res.status(404).json({ message: 'Aucun produit accepté trouvé.' });
      }

      // Envoyer les produits trouvés en réponse
      res.status(200).json(acceptedProducts);
  } catch (error) {
      console.error('Erreur lors de la récupération des produits acceptés:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
      .populate('category')
      .populate('supplier');
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error.message);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
const getLatestAcceptedProducts = async (req, res) => {
  try {
    console.log("Récupération des produits acceptés..."); // Ajoutez ce log

    const products = await Product.find({ statut: 'accepté' }) // Filtrer par statut
        .sort({ createdAt: -1 }) // Trier par date de création (du plus récent au plus ancien)
        .limit(10); // Limiter le nombre de résultats à 10 (vous pouvez changer ce nombre)

    console.log("Produits récupérés:", products); // Ajoutez ce log
    res.status(200).json(products); // Retourner les produits trouvés
  } catch (error) {
    console.error('Erreur lors de la récupération des produits acceptés:', error); // Mettez à jour ce log
    res.status(500).json({ message: 'Erreur lors de la récupération des produits.' });
  }
};
const countProducts = async (req, res) => {
  try {
    const productCount = await Product.countDocuments(); // Utilisez Product au lieu de Productmodel
    res.status(200).json({ count: productCount });
  } catch (error) {
    console.error('Erreur lors du comptage des produits:', error); // Ajout d'un message d'erreur plus explicite
    res.status(500).send('Erreur lors du comptage des produits');
  }
};

module.exports = { addProduct, 
  getAllProducts,
   acceptProduct,
    rejectProduct ,
    getAcceptedProducts,
    getProductById,
    getLatestAcceptedProducts,
    countProducts
  };