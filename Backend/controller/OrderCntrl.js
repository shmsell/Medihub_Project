const Order = require('../models/Ordermodel');
const Cart = require('../models/Cartmodel');
const Product = require('../models/Productmodel');

// Fonction pour passer une commande
const placeOrder = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, street, city, postalCode, paymentMethod, cart } = req.body;

    const user = req.user.id;

    // Vérifiez que toutes les données nécessaires sont présentes
    if (!firstname || !lastname || !email || !mobile || !street || !city || !postalCode || !cart) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const existingCart = await Cart.findById(cart).populate('items.productId'); // Ajoutez populate pour obtenir les détails du produit
    if (!existingCart) {
      return res.status(404).json({ message: "Le panier n'existe pas." });
    }

    // Calculez le total ici en vous assurant que les valeurs sont valides
    const totalAmount = existingCart.items.reduce((acc, item) => {
      const price = item.productId.prix || 0; // Assurez-vous d'obtenir un prix valide
      const quantity = item.quantity || 0; // Assurez-vous d'obtenir une quantité valide
      return acc + (price * quantity);
    }, 0);

    // Vérifiez que totalAmount est un nombre valide
    if (isNaN(totalAmount) || totalAmount < 0) {
      return res.status(400).json({ message: "Le montant total est invalide." });
    }
    

    const newOrder = new Order({
      firstname,
      lastname,
      email,
      mobile,
      shippingAddress: {
        street,
        city,
        postalCode,
      },
      paymentMethod: paymentMethod || 'espèces',
      totalAmount,
      user,
      cart: existingCart._id, // Liez la commande au panier
    });

    await newOrder.save();

    res.status(201).json({ message: "Commande créée avec succès !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la commande." });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstname lastname email') // Popule les informations de l'utilisateur
      .populate('cart.productId')
      .sort({ orderDate: -1 });// Popule les informations du panier si nécessaire

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes.' });
  }
};
const getFiveOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstname lastname email') // Popule les informations de l'utilisateur
      .populate('cart.productId')
      .sort({ orderDate: -1 })// Popule les informations du panier si nécessaire
      .limit(5);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes.' });
  }
};
 const getOrdersByDay = async (req, res) => {
  try {
    const orders = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
                totalOrders: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 1,
                totalOrders: 1,
            },
        },
    ]);
    res.json(orders);
} catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes.' });
}
};
// Route pour récupérer les produits les plus vendus
const topProduct = async (req, res) => {
  try {
    const orders = await Order.find().populate('cart'); // Assurez-vous que `cart` est correctement rempli

    const productSales = {};

    orders.forEach(order => {
      if (order.cart && order.cart.products) {
        order.cart.products.forEach(product => {
          const productId = product._id.toString();
          if (!productSales[productId]) {
            productSales[productId] = {
              name: product.nom, // Assurez-vous que `nom` est un champ de votre modèle Product
              totalSold: 0,
            };
          }
          productSales[productId].totalSold += product.quantity; // Assurez-vous que `quantity` est bien défini
        });
      }
    });

    // Convertir en tableau et trier par totalSold
    const sortedProducts = Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 10); // Les 10 meilleurs produits

    res.json(sortedProducts);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits les plus vendus :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits les plus vendus.' });
  }
};
const getMonthlySales = async (req, res) => {
  try {
      // Calculer les ventes mensuelles basées sur totalAmount avec statut 'payé'
      const monthlySales = await Order.aggregate([
          {
              // Filtrer les commandes avec statut 'payé'
              $match: {
                  status: 'payé'
              }
          },
          {
              // Regrouper les commandes par année et mois
              $group: {
                  _id: {
                      year: { $year: "$orderDate" }, // Extraire l'année
                      month: { $month: "$orderDate" } // Extraire le mois
                  },
                  totalSales: { $sum: "$totalAmount" } // Somme des montants des ventes
              }
          },
          {
              // Trier par année et mois
              $sort: {
                  "_id.year": 1,
                  "_id.month": 1
              }
          }
      ]);

      // Préparer les résultats
      const sales = [];
      const months = [];

      // Itérer sur les résultats pour remplir les tableaux
      monthlySales.forEach((sale) => {
          sales.push(sale.totalSales); // Ajouter les ventes totales
          months.push(`${sale._id.month}/${sale._id.year}`); // Ajouter le mois et l'année
      });

      // Retourner les données
      res.status(200).json({
          sales: sales,
          months: months
      });
  } catch (error) {
      console.error("Erreur lors de la récupération des ventes mensuelles", error);
      res.status(500).json({ message: "Erreur lors de la récupération des ventes mensuelles" });
  }
};

const getOrdersForSupplier = async (req, res) => {
  try {
    const supplierId = req.user._id; // ID du fournisseur connecté

    // Récupérer toutes les commandes
    const orders = await Order.find()
      .populate({
        path: 'cart', // Peupler les données du panier (cart)
        populate: {
          path: 'items.product', // Peupler les produits dans le panier
          match: { supplier: supplierId }, // Filtrer les produits qui appartiennent au fournisseur connecté
        },
      });

    // Extraire uniquement les produits appartenant au fournisseur
    const supplierProducts = [];
    orders.forEach(order => {
      const supplierItems = order.cart.items.filter(item => item.product && item.product.supplier.equals(supplierId));
      
      // Si des produits du fournisseur sont présents, les ajouter à la liste
      if (supplierItems.length > 0) {
        supplierItems.forEach(item => {
          supplierProducts.push({
            product: item.product,
            quantity: item.quantity,
            orderDetails: {
              orderId: order._id,
              totalAmount: order.totalAmount,
              status: order.status,
              shippingAddress: order.shippingAddress,
              orderDate: order.orderDate,
            }
          });
        });
      }
    });

    res.status(200).json(supplierProducts);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits du fournisseur:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits du fournisseur.' });
  }

};

const getOrderDetails = async (req, res) => {
  try {
    // Trouver la commande avec l'ID fourni et peupler les détails du panier
    const order = await Order.findById(req.params.id).populate({
      path: 'cart',
      populate: {
        path: 'items.productId', // Assurez-vous que ce chemin correspond à votre modèle Product
        model: 'Product'
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};
const countOrders = async (req, res) => {
  try {
    // Utilisation de la méthode countDocuments() pour compter toutes les commandes
    const orderCount = await Order.countDocuments({});
    
    // Réponse avec le nombre total de commandes
    res.status(200).json({ orderCount });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: 'Erreur lors du comptage des commandes', error });
  }
};
const getUserOrders = async (req, res) => {
  try {
      const userId = req.user.id; // Assurez-vous que l'ID de l'utilisateur est dans req.user

      const orders = await Order.find({ user: userId }) // Trouver les commandes de l'utilisateur
          .populate('cart.productId') // Populer les informations des produits dans le panier
          .sort({ orderDate: -1 }); // Trier par date de commande

      if (!orders.length) {
          return res.status(404).json({ message: 'Aucune commande trouvée pour cet utilisateur.' });
      }

      res.status(200).json(orders);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des commandes.' });
  }
};

module.exports = { placeOrder,
  getAllOrders,
  getOrdersByDay,
  topProduct,
  getOrdersForSupplier,
  getMonthlySales,
  getOrderDetails,
  countOrders,
  getFiveOrders

 };
