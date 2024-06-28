const CategoryService = require("../services/categoryService");

async function getAllCategories(req, res) {
    try {
        const categories = await CategoryService.getAllCategory();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCategories,
}