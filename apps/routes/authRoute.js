const express = require('express');
const router = express.Router();
const UserController = require('../controllers/authController');
const ValidationInput = require('../middlewares/validation');
const CheckBanner = require("../middlewares/checkBanner");

router.post('/register', ValidationInput.validateRegisterInput, UserController.registerUser);
router.post('/login', ValidationInput.validateLoginInput, CheckBanner.checkBanner, UserController.login);

module.exports = router;