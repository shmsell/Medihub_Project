const express = require('express');
const router = express.Router();
const { placeOrder,
       getAllOrders,
       getOrdersByDay,
       topProduct,
       getOrdersForSupplier,
       getMonthlySales,
       getOrderDetails,
       countOrders,
       getFiveOrders

 } = require('../controller/OrderCntrl');
const authenticateToken =require('../middlewares/Authentification')

// Route protégée pour passer une commande
router.post('/placeorder', authenticateToken, placeOrder);
router.get('/getorders', getAllOrders);
router.get('/products-to-prepare', authenticateToken, getOrdersForSupplier);

router.get('/getFive', getFiveOrders);
router.get('/ordersDay', getOrdersByDay);
router.get('/countOrders', countOrders);
router.get('/topProduct', topProduct);
router.get('/monthlySales', getMonthlySales);
router.get('/:id',  getOrderDetails);








module.exports = router;
