const Cart = require("../models/cart");
const ShoeService = require("../services/shoeService")

function getCartByUser(userid) {
    return new Promise((resolve, reject) => {
        Cart.getCartByUser(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getCartItemByUser(cartid) {
    return new Promise((resolve, reject) => {
        Cart.getCartItemByUser(cartid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function getCartData(userid) {
    try {
        const cart = await getCartByUser(userid);
        if (cart.length === 0) return { items: [] };
        const cartshoe = await getCartItemByUser(cart[0].id);
        const shoes = await Promise.all(cartshoe.map(async (shoe, index) => {
            console.log(shoe);
            const shoedetail = await ShoeService.getItemDetailById(shoe.shoeid);
            const shoe1 = await ShoeService.getItemById(shoedetail.shoeid);
            const shoe1Copy = { ...shoe1[0] };
            delete shoe1Copy.detail;
            const result = {
                ...shoe1Copy,
                ...shoedetail,
                quantity: shoe.quantity,
                cartshoeid: shoe.id
            };
            return result;
        }))
        const result = {};
        result.userid = cart[0].userid;
        result.status = cart[0].status;
        result.items = shoes;
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

function addToCart(userid) {
    return new Promise((resolve, reject) => {
        Cart.addToCart(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function addToCartshoe(formData, cartid) {
    return new Promise((resolve, reject) => {
        Cart.addToCartshoe(formData, cartid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getCartshoeById(cartshoeId) {
    return new Promise((resolve, reject) => {
        Cart.getCartshoeById(cartshoeId, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getCartById(cartId) {
    return new Promise((resolve, reject) => {
        Cart.getCartById(cartId, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function checkUserUpdate(cartshoeid) {
    try {
        const cartshoe = await getCartshoeById(cartshoeid);

        const cartid = cartshoe[0].cartid;
        const cart = await getCartById(cartid);

        const userid = cart[0].userid;
        return userid;
    } catch (err) {
        throw new Error(err);
    }
}

function updateQuantity(quantity, id) {
    return new Promise((resolve, reject) => {
        Cart.updateQuantity(quantity, id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function addItems(userid, formData) {
    try {
        const cartTable = await getCartByUser(userid);
        let cartid = -1;
        let cartshoeid = -1;
        let quantity = 0;
        if (cartTable.length === 0) {
            const data = await addToCart(userid);
            cartid = data.rows[0].id;
        } else {
            cartid = cartTable[0].id;
        }

        const cartshoeTable = await getCartItemByUser(cartid);
        if (cartshoeTable.length != 0) {
            cartshoeTable.map((item) => {
                if (item.shoeid == formData.shoeid) {
                    cartshoeid = item.id;
                    quantity = item.quantity;
                }
            })
        }
        if (cartshoeid != -1) {
            await updateQuantity(formData.quantity + quantity, cartshoeid);
        } else {
            await addToCartshoe(formData, cartid);
        }
        return true;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

function deleteToCartshoe(cartid) {
    return new Promise((resolve, reject) => {
        Cart.deleteToCartshoe(cartid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function deleteToCart(userid) {
    return new Promise((resolve, reject) => {
        Cart.deleteToCart(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function deleteCartItem(id) {
    return new Promise((resolve, reject) => {
        Cart.deleteCartItem(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function deleteCartByShoeid(shoeid) {
    return new Promise((resolve, reject) => {
        Cart.deleteCartByShoeid(shoeid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getCartData,
    getCartByUser,
    addItems,
    updateQuantity,
    checkUserUpdate,
    deleteToCart,
    deleteToCartshoe,
    deleteCartItem,
    getCartshoeById,
    getCartById,
    deleteCartByShoeid,
}