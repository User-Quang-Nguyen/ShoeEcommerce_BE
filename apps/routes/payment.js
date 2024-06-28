const express = require('express');
const router = express.Router();
const PaymentController = require("../controllers/payment");

router.post("", PaymentController.payment);
router.post("/callback", PaymentController.callback);
router.post("/order-status/:app_trans_id", PaymentController.checkPayment);

module.exports = router