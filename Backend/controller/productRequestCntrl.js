const ProductRequest = require('../models/ProductRequestmodel');
const Product = require('../models/Productmodel');

const addProductRequest = async (req, res) => {
    try {
        const { products } = req.body; // Récupérer les données du corps de la requête

        // Valider les données reçues
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'Veuillez fournir au moins un produit.' });
        }

        // Calculer le prix total et valider les produits
        let totalPrice = 0;
        const productDetails = await Promise.all(products.map(async ({ productId, quantity }) => {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error(`Produit non trouvé: ${productId}`);
            }
            if (quantity < 1) {
                throw new Error(`La quantité pour le produit ${productId} doit être supérieure ou égale à 1.`);
            }
            totalPrice += product.prix * quantity; // Calculer le prix total

            return { productId, quantity }; // Retourner le produit et sa quantité
        }));

        // Créer une nouvelle demande de produit
        const newProductRequest = new ProductRequest({
            products: productDetails,
            totalPrice,
        });

        // Sauvegarder la demande dans la base de données
        await newProductRequest.save();

        return res.status(201).json({ message: 'Demande de produit ajoutée avec succès.', data: newProductRequest });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la demande de produit:', error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la demande de produit.', error: error.message });
    }
};
const getAllProductRequests = async (req, res) => {
    try {
        const requests = await ProductRequest.find()
            .populate('products') // Récupérer les informations des produits associés
            .sort({ createdAt: -1 }); // Trier par date de création, du plus récent au plus ancien
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des demandes de produits' });
    }
};
const updateRequestStatus = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID de la demande à partir des paramètres
    const { status } = req.body; // Récupérer le nouveau statut à partir du corps de la requête

    try {
        // Vérifier si le statut est valide
        const validStatuses = ['en_preparation', 'ramasse'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Statut invalide.' });
        }

        // Mettre à jour la demande
        const updatedRequest = await RequestModel.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Demande non trouvée.' });
        }

        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut.', error });
    }
};
const  getRequestsByDay = async (req, res) => {
    try {
        const result = await ProductRequest.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Tri par date
            }
        ]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des demandes par jour.' });
    }
}
module.exports = {
    addProductRequest,
    getAllProductRequests,
    updateRequestStatus,
    getRequestsByDay
};
