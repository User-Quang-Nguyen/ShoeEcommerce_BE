const CartService = require("./cartService");
const ShoeService = require("./shoeService");
const Shoe = require("../models/shoe");

async function deleteShoe(id) {
    const shoe_detail = await ShoeService.getItemDetail(id);
    const list_shoe_id = shoe_detail.map(item => item.id);
    list_shoe_id.map(async (id) => {
        await CartService.deleteCartByShoeid(id);
    })

    const result = await new Promise((resolve, reject) => {
        Shoe.deleteShoe(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })

    return result;
}

module.exports = {
    deleteShoe
}