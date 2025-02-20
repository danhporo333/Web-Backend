const { v4: uuidv4 } = require("uuid");
const Product = require('../model/productModel');

const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock_quantity, category_id, image_id } = req.body;
        const id = uuidv4(); // Tạo UUID cho sản phẩm mới

        await Product.createProduct(id, name, description, price, stock_quantity, category_id, image_id);

        res.status(201).json({ message: "Sản phẩm đã được thêm thành công!", product_id: id });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = addProduct;