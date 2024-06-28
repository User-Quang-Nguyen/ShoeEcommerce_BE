const express = require('express');
const router = express.Router();
const ShoeController = require("../controllers/shoeController")

router.get("", ShoeController.getItems);

module.exports = router;