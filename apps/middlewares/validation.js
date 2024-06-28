const utils = require("../utils/stringUtil")

const validateRegisterInput = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.', state: false });
    }
    if (!utils.isValidEmail(email)) {
        return res.status(400).json({ message: 'Email không hợp lệ', state: false })
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Mật khẩu lớn hơn 8 chữ số', state: false })
    }
    if (!utils.hasSpace(name)) {
        return res.status(400).json({ message: 'Tên phải có ít nhất một khoảng trống', state: false })
    }
    if (utils.isWhitespaceOrEmpty(name) || utils.isWhitespaceOrEmpty(email) || utils.isWhitespaceOrEmpty(password)) {
        return res.status(400).json({ message: 'Không được bỏ trống thông tin', state: false })
    }
    next();
};

const validateLoginInput = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        next();
    } else {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.', state: false });
        }
        if (!utils.isValidEmail(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ', state: false })
        }
        if (password.length < 8) {
            console.log(password);
            return res.status(400).json({ message: 'Mật khẩu lớn hơn 8 chữ số', state: false })
        }
        if (utils.isWhitespaceOrEmpty(email) || utils.isWhitespaceOrEmpty(password)) {
            return res.status(400).json({ message: 'Không được bỏ trống thông tin', state: false })
        }
        next();
    }
};

const validateUpdateUserInfor = (req, res, next) => {
    const { name, email, phonenumber, address, gender } = req.body;

    if (!name || !email || !phonenumber || !address) {
        return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin.", state: false })
    }
    if (!utils.isValidEmail(email)) {
        return res.status(400).json({ message: 'Email không hợp lệ', state: false })
    }
    if (!utils.isValidPhone(phonenumber)) {
        return res.status(400).json({ message: "Số điện thoại không hợp lệ", state: false })
    }
    next();
}

module.exports = {
    validateRegisterInput: validateRegisterInput,
    validateLoginInput: validateLoginInput,
    validateUpdateUserInfor,
};
