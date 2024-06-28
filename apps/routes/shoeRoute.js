const express = require('express');
const router = express.Router();
const ShoeController = require("../controllers/shoeController")

router.get("/:id", ShoeController.getItemById);
router.get("", ShoeController.fullTextSearch);

module.exports = router;