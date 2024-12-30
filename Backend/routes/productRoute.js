const express = require('express');
const router = express.Router();
const { addProduct,
     getAllProducts,
     acceptProduct,
     rejectProduct,
     getAcceptedProducts,
     getProductById,
     getLatestAcceptedProducts,
     countProducts,

 } = require('../controller/ProductCntrl');
const authenticateToken =require('../middlewares/Authentification')
router.post('/add',authenticateToken ,addProduct);
router.get('/all', getAllProducts);
router.get('/countProducts', countProducts);
router.get('/getLatest', getLatestAcceptedProducts);
router.patch('/accept/:id',authenticateToken, acceptProduct);
router.patch('/reject/:id',authenticateToken , rejectProduct);
router.get('/accepted', getAcceptedProducts);
router.get('/:productId', getProductById);







module.exports = router;
