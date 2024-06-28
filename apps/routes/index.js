var express = require("express");
var router = express.Router();

router.use("/authentication", require("./authRoute"));
router.use("/home", require("./home"));
router.use("/shoe", require("./shoeRoute"));
router.use("/cart", require("./cartRoute"));
router.use("/user", require("./userRoute"));
router.use("/order", require("./orderRoute"));
router.use("/admin", require("./adminRoute"));
router.use("/brand", require("./brandRoute"));
router.use("/category", require("./cateRoute"));
router.use("/payment", require("./payment"));

module.exports = router;