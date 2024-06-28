
const updateQuantity = (req, res, next) => {
    const formData = req.body;
    if (!formData.hasOwnProperty('cartshoeid') || !formData.hasOwnProperty('quantity')) {
        return res.status(400).json({ message: "Trường thông tin không được truyền vào", state: false })

    }
    if (Object.keys(formData).length === 0) {
        return res.status(400).json({ message: "Thiếu trường thông tin", state: false })
    }

    next();
}

const addToCart = (req, res, next) => {
    const formData = req.body;
    if (!formData.hasOwnProperty('shoeid') || !formData.hasOwnProperty('quantity')) {
        return res.status(400).json({ message: "Trường thông tin không được truyền vào", state: false })

    }
    if (Object.keys(formData).length === 0) {
        return res.status(400).json({ message: "Thiếu trường thông tin", state: false })
    }
    next();
}

const addShoe = (req, res, next) => {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
        return res.status(400).json({ message: "Thiếu thông tin", state: false })
    }

    if (isNaN(price)) {
        return res.status(400).json({ message: "Giá, số lượng, size phải là số", state: false })
    }

    next();
}

const updateShoe = (req, res, next) => {
    const { shoeid, name, description, price } = req.body;
    if (!shoeid || !price || !name || !description) {
        return res.status(400).json({ message: "Không để trống thông tin", state: false })
    }

    if (isNaN(shoeid) || isNaN(price)) {
        return res.status(400).json({ message: "Các trường là số", state: true })
    }

    next();
}

const updateStateOrder = (req, res, next) => {
    const formData = req.body;
    // 1 hủy, 2 thành công, 3 payment
    if (!formData.hasOwnProperty('status') || !formData.hasOwnProperty('id')) {
        return res.status(400).json({ message: "Trường không hợp lệ", state: false });
    }
    if (formData.status == 1 || formData.status == 2 || formData.status == 3) {
        next();
    } else {
        return res.status(400).json({ message: "Trạng thái không hợp lệ", state: false });
    }
}

const deleteUser = (req, res, next) => {
    const formData = req.body;
    if (formData.hasOwnProperty('userid')) {
        next();
    } else {
        return res.status(400).json({ message: "Trường không hợp lệ", state: false });
    }
}

module.exports = {
    updateQuantity,
    addToCart,
    addShoe,
    updateShoe,
    updateStateOrder,
    deleteUser
}