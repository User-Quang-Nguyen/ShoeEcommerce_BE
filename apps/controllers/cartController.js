const CartService = require("../services/cartService")
const jwt = require("../utils/jwt")

async function getCartData(req, res) {
    const token = req.headers['authorization'];
    try {
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        try {
            const result = await CartService.getCartData(userid);
            return res.status(200).json(result);
        } catch (cartErr) {
            return res.status(500).json({ message: "Lỗi khi lấy dữ liệu giỏ hàng", status: false });
        }
    } catch (err) {
        return res.status(403).json({ message: "Xác thực thất bại", status: false });
    }
}

async function addToCart(req, res) {
    const token = req.headers['authorization'];
    try {
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const formData = req.body;
        try {
            await CartService.addItems(userid, formData);
            return res.status(200).json({ message: "Thêm giỏ hàng thành công", status: true });
        } catch (cartErr) {
            return res.status(500).json({ message: "Lỗi khi lấy dữ liệu giỏ hàng", status: false });
        }
    } catch (err) {
        return res.status(403).json({ message: "Xác thực thất bại", status: false });
    }
}

async function updateQuantity(req, res) {
    const token = req.headers['authorization'];
    try {
        const infor = await jwt.verifyToken(token);
        const formData = req.body;
        const userid = await CartService.checkUserUpdate(formData.cartshoeid);
        if (userid != infor.id) {
            throw new Error("Xác thực thất bại");
        }

        await CartService.updateQuantity(formData.quantity, formData.cartshoeid);
        return res.status(200).json({ message: "Cập nhật giỏ hàng thành công", status: true });
    } catch (err) {
        // console.log(err);
        return res.status(403).json({ message: "Xác thực thất bại", status: false });
    }
}

async function deleteCartItem(req, res) {
    const token = req.headers['authorization'];
    try {
        const infor = await jwt.verifyToken(token);
        const useridToken = infor.id;
        const CartshoeId = req.body.id;

        const result = await CartService.getCartshoeById(CartshoeId);
        const cartid = result[0].cartid;

        const cart_infor = await CartService.getCartById(cartid);
        const userid = cart_infor[0].userid;

        if (userid != useridToken) {
            throw new Error("Xác thực thất bại");
        }
        try{
            await CartService.deleteCartItem(CartshoeId);
            res.status(200).json({ message: "Xóa thành công", status: true });
        }catch(e){
            throw new Error("Lỗi bất định");
        }
    } catch (e) {
        res.status(403).json({ message: "Xác thực thất bại", status: false });
    }
}

module.exports = {
    getCartData,
    addToCart,
    updateQuantity,
    deleteCartItem
}