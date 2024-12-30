// productRequestRoutes.js
const express = require('express');
const { addProductRequest,
    getAllProductRequests,
    updateRequestStatus,
    getRequestsByDay
 } = require('../controller/productRequestCntrl'); // Ajustez le chemin en fonction de votre structure de projet
 const authenticateToken =require('../middlewares/Authentification')

const router = express.Router();

// Route pour ajouter une demande de produit
router.post('/product-requests', addProductRequest);
router.get('/get-requests', getAllProductRequests);
router.get('/requests-day', getRequestsByDay);
router.patch('/update-status/:id',authenticateToken, getAllProductRequests);



module.exports = router;
