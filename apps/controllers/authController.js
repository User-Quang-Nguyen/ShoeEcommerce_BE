const UserService = require('../services/authService');
const jwt = require('../utils/jwt')

function registerUser(req, res) {
    try {
        var user = req.body;
        user = {
            "name": user.name,
            "email": user.email,
            "password": user.password
        }
        UserService.register(user, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Đăng ký thất bại!", state: false });
            }
            return res.status(200).json({ message: "Đăng ký thành công!", state: true });
        })
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function login(req, res) {
    try {
        var formData = req.body;
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            UserService.login(formData, (err, user) => {
                if (err) {
                    return res.status(400).json({ message: err.message, state: false });
                }
                let token = jwt.generateToken(user.id, user.name, user.role)
                let result = {
                    "id": user.id,
                    "name": user.name,
                    "role": user.role
                }
                return res.status(200).json({ message: "Đăng nhập thành công!", state: true, token: token, result: result });
            })
        } else {
            jwt.verifyToken(authHeader)
                .then(result => {
                    return res.status(200).json({ message: "Đăng nhập thành công!", state: true, result: result })
                })
                .catch(err => {
                    return res.status(400).json({ message: err.message, state: false });
                })
        }
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

module.exports = {
    registerUser: registerUser,
    login: login
}