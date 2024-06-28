const OrderService = require("../services/orderService")
const CartService = require("../services/cartService")
const UserService = require("../services/userService")
const ShoeService = require("../services/shoeService")
const jwt = require("../utils/jwt")

async function addToOrderTable(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const cartInfor = await CartService.getCartData(userid);
        const items = cartInfor.items;
        await OrderService.order(userid, items);
        return res.status(200).json({ message: "Đặt hàng thành công", status: true });
    } catch (err) {
        return res.status(400).json({ message: err.message, status: false })
    }
}

async function getListItemOrder(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const list = await OrderService.getListItemOrder(userid);
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error", status: false })
    }
}

async function updateStateOrder(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const { id, status } = req.body;
        const user = await OrderService.getOrderById(id);
        const realUser = user[0].userid;
        if (realUser != userid) {
            return res.status(403).json({ message: "Xác thực thất baị", state: false });
        }

        const result = await OrderService.updateStateOrder(id, status);
        if (result == false) {
            return res.status(403).json({ message: "Thất bại", state: false });
        }
        return res.status(200).json({ message: "Thành công", state: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, state: false });
    }
}

async function adminUpdateStateOrder(req, res) {
    try {
        const { id, status } = req.body;
        const result = await OrderService.updateStateOrder(id, status);
        if (result == false) {
            return res.status(403).json({ message: "Thất bại", state: false });
        }
        return res.status(200).json({ message: "Thành công", state: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, state: false });
    }
}

async function getMoneyOrder(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const cartInfor = await CartService.getCartData(userid);
        const items = cartInfor.items;
        const money = await OrderService.calculate(items);
        return res.status(200).json(money);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error", status: false })
    }
};

async function getAllOrder(req, res) {
    try {
        const orders = await OrderService.getAllOrder();
        const order_details = await Promise.all(orders.map(async (order, index) => {
            const items = await OrderService.getOrderDetailById(order.id);
            const user = await UserService.getUserById(order.userid);
            if (order.total == 0) {
                return null;
            }
            const result = {
                ...order,
                address: user[0]?.address,
                name: user[0]?.name,
            }
            const details = await Promise.all(items.map(async (item) => {
                const detail = await ShoeService.getItemDetailById(item.shoeid);
                const de = await ShoeService.getItemById(detail.shoeid);

                delete detail.quantity;
                delete detail.shoeid;
                delete detail.id;
                delete de[0].detail;
                delete de[0].price;
                delete de[0].id;

                const fullInfor = {
                    ...item,
                    ...detail,
                    ...de[0]
                };
                return fullInfor;
            }));
            result.items = details;
            return result;
        }))
        const filteredList = order_details.filter(order => order !== null);
        return res.status(200).json(filteredList);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Lỗi xác thực", status: false })
    }
}

module.exports = {
    addToOrderTable,
    getListItemOrder,
    updateStateOrder,
    getMoneyOrder,
    getAllOrder,
    adminUpdateStateOrder
}