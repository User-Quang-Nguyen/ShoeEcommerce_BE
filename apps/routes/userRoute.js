var express = require('express');
var router = express.Router();
const UserController = require("../controllers/userController");
const Login = require("../middlewares/checkLogin");
const middlewares = require("../middlewares/validation");

router.get('', Login.checkLogin, UserController.getUserById);
router.put('', Login.checkLogin, middlewares.validateUpdateUserInfor, UserController.updateUserInfor);

module.exports = router;