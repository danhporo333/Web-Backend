const Product = require('../model/productModel');

const createProductService = async (productData) => {
    try {
        let result = await Product.createProduct(productData);
        return productData; // Trả về dữ liệu sản phẩm vừa thêm
    } catch (error) {
        throw error;
    }
};

const getAllProductService = async () => {
    try {
        let products = await Product.getAllProducts();
        return products; // Trả về dữ liệu sản phẩm vừa thêm
    } catch (error) {
        throw error;
    }
};

module.exports = { createProductService, getAllProductService };
