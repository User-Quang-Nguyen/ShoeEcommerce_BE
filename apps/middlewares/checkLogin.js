const jwt = require("../utils/jwt")

const checkLogin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "Bạn chưa đăng nhập", status: false })
    }
    next();
}

const isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "Bạn chưa đăng nhập", status: false })
    }
    try{
        const infor = await jwt.verifyToken(token);
        const role = infor.role;
        if (role != 1) {
            return res.status(403).json({ message: "Bạn không có quyền admin", status: false })
        }
        next();
    }catch(err){
        return res.status(403).json({ message: "Token sai", status: false })
    }
}

module.exports = {
    checkLogin,
    isAdmin,
}