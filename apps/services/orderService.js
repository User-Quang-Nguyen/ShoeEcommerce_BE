const Order = require("../models/order");
const Shoe = require("../models/shoe");
const CartService = require("../services/cartService")
const ShoeService = require("../services/shoeService")

function calculate(items) {
    try {
        let sum = 0;
        items.map((item) => {
            sum += item.quantity * item.price;
        });
        return sum;
    } catch (err) {
        throw new Error(err.message);
    }
}

function addToOrderTable(userid, total) {
    return new Promise((resolve, reject) => {
        Order.addToOrderTable(userid, total, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function addToOrderDetailTable(orderid, item) {
    return new Promise((resolve, reject) => {
        Order.addToOrderDetailTable(orderid, item, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getOrderByUserId(userid) {
    return new Promise((resolve, reject) => {
        Order.getOrderByUserId(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getOrderDetailById(orderid) {
    return new Promise((resolve, reject) => {
        Order.getOrderDetailById(orderid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function updateQuantityShoe(quantity, id) {
    const shoe = await new Promise((resolve, reject) => {
        Shoe.getItemDetailById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
    const newQuantity = shoe[0].quantity - quantity;
    if (newQuantity < 0) {
        return false;
    }
    return new Promise((resolve, reject) => {
        Shoe.updateQuantity(newQuantity, id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function backQuantityShoe(quantity, id) {
    const shoe = await new Promise((resolve, reject) => {
        Shoe.getItemDetailById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
    const newQuantity = shoe[0].quantity + quantity;

    return new Promise((resolve, reject) => {
        Shoe.updateQuantity(newQuantity, id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function checkQuantity(items) {
    try {
        const results = await Promise.all(items.map(async (item) => {
            return updateQuantityShoe(item.quantity, item.id);
        }));
        results.forEach((result, index) => {
            if (!result) {
                const item = items[index];
                results.forEach(async (result1, index1) => {
                    if (result1) {
                        await backQuantityShoe(items[index1].quantity, items[index1].id);
                    }
                })
                throw new Error(`Không đủ số lượng cho sản phẩm ${item.name}`);
            }
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

async function order(userid, items) {
    try {
        await checkQuantity(items);
        const total = await calculate(items);
        const result = await addToOrderTable(userid, total);
        const orderid = result.rows[0].id;
        items.map(async (item) => {
            await addToOrderDetailTable(orderid, item);
        })
        const cart = await CartService.getCartByUser(userid);
        const cartid = cart[0].id;
        await CartService.deleteToCartshoe(cartid);
        await CartService.deleteToCart(userid);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getListItemOrder(userid) {
    try {
        const orders = await getOrderByUserId(userid);
        const list = await Promise.all(orders.map(async (order) => {
            const items = await getOrderDetailById(order.id);
            if (order.total == 0) {
                return null;
            }
            const result = {
                id: order.id,
                status: order.status,
                items: items,
                total: order.total,
                apptransid: order.apptransid,
                createdat: order.createdat
            };

            const details = await Promise.all(result.items.map(async (item) => {
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
        }));
        const filteredList = list.filter(order => order !== null);
        return filteredList;
    } catch (err) {
        throw new Error(err.message);
    }
}

function updateState(orderid, status) {
    return new Promise((resolve, reject) => {
        Order.updateState(orderid, status, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function updateStateOrder(orderid, status) {
    const order = await getOrderById(orderid);
    if (order[0].status == 0 || order[0].status == 3) {
        if (status == 2 || status == 3) {
            const result = await updateState(orderid, status);
            return result;
        } else if (status == 1) {
            const ordersDetail = await getOrderDetailById(orderid);
            ordersDetail.map(async (item) => {
                await backQuantityShoe(item.quantity, item.shoeid);
            })
            const result = await updateState(orderid, status);
            return result;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getOrderById(id) {
    return new Promise((resolve, reject) => {
        Order.getOrderById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getAllOrder() {
    return new Promise((resolve, reject) => {
        Order.getAllOrder((err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function setAppTransId(orderid, transid) {
    return new Promise((resolve, reject) => {
        Order.setAppTransId(orderid, transid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    calculate,
    order,
    getListItemOrder,
    updateStateOrder,
    getOrderById,
    getAllOrder,
    getOrderDetailById,
    setAppTransId
}