const connection = require('../Config/database');

const createProduct = async (id, name, description, price, stock_quantity, category_id, image_id) => {
    try {
        const [result] = await connection.execute(
            `INSERT INTO product (id, name, description, price, stock_quantity, category_id, image_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, name, description, price, stock_quantity, category_id, image_id]
        );
        return result;
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw error;
    }
};

// const getAllProducts = async () => {
//     try {
//         const [rows] = await db.execute(`
//             SELECT p.id, p.name, p.description, p.price, p.stock_quantity, 
//                    c.name AS category_name, f.path AS image_path
//             FROM product p
//             LEFT JOIN category c ON p.category_id = c.id
//             LEFT JOIN files f ON p.image_id = f.id
//         `);
//         return rows;
//     } catch (error) {
//         console.error("Lỗi khi lấy danh sách sản phẩm:", error);
//         throw error;
//     }
// };

module.exports = {
    createProduct
}