const express = require("express");
const {
    createSupplier,
    loginSupplier,
    getAllSuppliers,
    acceptSupplier,
    rejectSupplier,
    countSuppliers,
    getOrdersForSupplier

} = require("../controller/SupplierCntrl");
const authenticateToken =require('../middlewares/Authentification')

const router = express.Router();
router.post("/registerSupplier",createSupplier);
router.post("/loginSupplier", loginSupplier);

router.get("/getAllSuppliers", getAllSuppliers);
router.get("/countSuppliers", countSuppliers);
router.get('/products-to-prepare', authenticateToken, getOrdersForSupplier);

router.put('/accept/:id', acceptSupplier);
router.put('/reject/:id', rejectSupplier);





module.exports = router;