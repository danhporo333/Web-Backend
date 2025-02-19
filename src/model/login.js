const connection = require('../Config/database');


const getUserByEmail = async (email) => {
    try {
        const [rows] = await connection.execute("SELECT * FROM Register WHERE email = ?", [email])
        return rows.length > 0 ? rows[0] : null;
        console.log("check rows ", rows)
    } catch (error) {
        console.error("Lỗi khi lấy người dùng:", error);
        throw error; // Ném lỗi để xử lý ở service hoặc controller
    }
}

module.exports = getUserByEmail 