const UserService = require("../services/userService")
const jwt = require("../utils/jwt")

async function getUserById(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const userInfor = await UserService.getUserById(userid);
        if (!userInfor || userInfor.length == 0) {
            return res.status(400).json({ message: "Lỗi xác thực", status: false })
        }
        return res.status(200).json(userInfor[0]);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi xác thực", status: false })
    }
}

async function updateUserInfor(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const formData = req.body;
        const result = await UserService.updateInfor(userid, formData);
        return res.status(200).json({ message: "Cập nhật thông tin thành công", status: true })
    } catch (error) {
        return res.status(400).json({ message: "Lỗi xác thực", status: false })
    }
}

async function getAllUser(req, res) {
    try {
        const result = await UserService.getAllUser();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi xác thực", status: false })
    }
}

async function deleteUser(req, res) {
    try {
        const {userid} = req.body;
        const result = await UserService.deleteUser(userid);
        return res.status(200).json({ message: "Xóa người dùng", status: true })
    } catch (error) {
        return res.status(400).json({ message: "Lỗi xác thực", status: false })
    }
}

module.exports = {
    getUserById,
    updateUserInfor,
    getAllUser,
    deleteUser
}