const express = require("express");
const {
  createUser,  
  loginUserCtrl,
  getCurrentUser,
  updateUser
  

} = require("../controller/UserCntrl");
const authenticateToken =require('../middlewares/Authentification')
const router = express.Router();
router.post("/register",createUser);
router.post("/login", loginUserCtrl);
router.get("/currentUser",authenticateToken, getCurrentUser);
router.put('/currentUser/update', authenticateToken, updateUser);





module.exports = router;