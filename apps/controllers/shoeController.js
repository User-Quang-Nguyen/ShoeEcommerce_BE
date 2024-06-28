const ShoeService = require("../services/shoeService");
const DeleteService = require("../services/deleteService");

async function getItems(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 12;
        const startIndex = 1 + pageSize * (page - 1);
        const endIndex = startIndex + pageSize - 1;

        const result = await ShoeService.getItems(startIndex, endIndex);
        if (!result.length) {
            return res.status(204).json({ message: "Không có dữ liệu" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

async function getItemById(req, res) {
    try {
        const id = req.params.id;
        const result = await ShoeService.getItemById(id);
        if (!result.length) {
            return res.status(204).json({ message: "Không có dữ liệu" });
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function addShoe(req, res) {
    try {
        const formData = req.body;
        const result = await ShoeService.insertFullShoe(formData);
        return res.status(200).json({ message: "Thêm sản phẩm thành công", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function updateShoe(req, res) {
    try {
        const formData = req.body;
        await ShoeService.updateShoe(formData);
        return res.status(200).json({ message: "Cập nhật thành công", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function deleteShoe(req, res) {
    try {
        const id = req.query.id;
        await DeleteService.deleteShoe(id);
        return res.status(200).json({ message: "Xóa thành công", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Không thể xóa" });
    }
}
async function getAllItemsDetail(req, res) {
    try {
        const result = await ShoeService.getAllItemsDetail();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateShoeDetail(req, res) {
    try {
        const formData = req.body;
        await ShoeService.updateShoeDetail(formData);
        return res.status(200).json({ message: "Cập nhật thành công", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra", state: false });
    }
}

async function insertShoeDetail(req, res) {
    try {
        const formData = req.body;
        await ShoeService.insertShoeDetail(formData);
        return res.status(200).json({ message: "Them thanh cong", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra", state: false });
    }
}

async function fullTextSearch(req, res) {
    try {
        const key = req.query.key;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const [result, totalResults] = await Promise.all([
            ShoeService.fullTextSearch(key, page, limit),
            ShoeService.countSearchResults(key)
        ]);

        const totalPages = Math.ceil(totalResults[0].count / limit);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getItems,
    getItemById,
    addShoe,
    updateShoe,
    deleteShoe,
    getAllItemsDetail,
    updateShoeDetail,
    insertShoeDetail,
    fullTextSearch,
}