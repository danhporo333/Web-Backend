// const connection = require('../Config/database');
import connection from "../Config/database.js";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";

const createCategory = async (name, description, parent_id, image) => {
    try {
        const id = uuidv4(); // Tạo UUID cho category
        const created_at = new Date();
        await connection.execute(
            "INSERT INTO category (id, name, description, parent_id, image, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            [id, name, description, parent_id, image, created_at]
        );
        return id;
    } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
        throw error; // Ném lỗi để xử lý ở Controller
    }
};

module.exports = createCategory;