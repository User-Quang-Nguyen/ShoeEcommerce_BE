const BrandService = require("../services/brandService");

async function getAllBrand(req, res) {
    try {
        const result = await BrandService.getAllBrand();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { getAllBrand }