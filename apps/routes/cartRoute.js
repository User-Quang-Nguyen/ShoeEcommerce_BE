const express = require('express');
const router = express.Router();
const CartController = require("../controllers/cartController")
const Login = require("../middlewares/checkLogin")
const CheckFormData = require("../middlewares/checkFormData")

router.get("", Login.checkLogin, CartController.getCartData);
router.post("", Login.checkLogin, CheckFormData.addToCart, CartController.addToCart);
router.put("", Login.checkLogin, CheckFormData.updateQuantity, CartController.updateQuantity);
router.delete("", Login.checkLogin, CartController.deleteCartItem);

module.exports = router;