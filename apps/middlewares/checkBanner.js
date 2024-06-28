const UserService = require("../services/userService");
const User = require("../models/user");

const findOne = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne(email, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const checkBanner = async (req, res, next) => {
    const email = req.body.email
    try {
        const user = await findOne(email);
        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy email!", state: false });
        }
        if (user.isdeleted == false) {
            next();
        } else {
            return res.status(403).json({ message: "Tài khoản đã bị xóa!", state: false });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message, state: false });
    }
}

module.exports = {
    checkBanner,
}