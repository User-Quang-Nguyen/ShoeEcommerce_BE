const express = require('express');
const router = express.Router();
const BrandController = require("../controllers/brandController");

router.get("", BrandController.getAllBrand);

module.exports = router