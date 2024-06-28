const express = require('express')
const router = express.Router()
const Login = require("../middlewares/checkLogin")
const OrderController = require("../controllers/orderController")
const CheckFormData = require('../middlewares/checkFormData')

router.post("", Login.checkLogin, OrderController.addToOrderTable);
router.get("", Login.checkLogin, OrderController.getListItemOrder);
router.get("/money", Login.checkLogin, OrderController.getMoneyOrder);
router.put("", Login.checkLogin, CheckFormData.updateStateOrder, OrderController.updateStateOrder);

module.exports = router;