const connection = require('../Config/database');

const createProduct = async (productData) => {
    try {
        const [result] = await connection.execute(
            `INSERT INTO product (id, name, description, price, stock_quantity, category_id, image) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                productData.id,
                productData.name,
                productData.description,
                productData.price,
                productData.stock_quantity,
                productData.category_id,
                productData.image
            ]
        );
        return result;
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw error;
    }
};


const getAllProducts = async () => {
    try {
        const [rows] = await connection.execute(
            `SELECT * FROM product`
        );
        return rows;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        throw error;
    }
};


module.exports = {
    createProduct, getAllProducts
}