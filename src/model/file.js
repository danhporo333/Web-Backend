const connection = require('../Config/database');

const createFile = async (id, name, path, created_at) => {
    try {
        const [result] = await connection.execute(
            `INSERT INTO files (id, name, path, created_at) VALUES (?, ?, ?, ?)`,
            [id, name, path, created_at]
        );
        return result;
    } catch (error) {
        console.error("Lỗi khi thêm file:", error);
        throw error;
    }
};

module.exports = createFile;