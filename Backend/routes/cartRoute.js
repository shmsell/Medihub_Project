const express = require('express');
const { addToCart,
         getCart,
         removeFromCart

 } = require('../controller/CartCntrl');
const authenticateToken =require('../middlewares/Authentification')
const router = express.Router();

router.post('/add', authenticateToken, addToCart);
router.get('/getCart', authenticateToken, getCart);
router.delete('/remove', authenticateToken, removeFromCart);



module.exports = router;
