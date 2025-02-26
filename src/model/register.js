// const connection = require('../Config/database');
import connection from '../Config/database.js';
// const crypto = require('crypto');
import crypto from 'crypto';

const createUser = async (email, name, password) => {
    try {
        const sql = `INSERT INTO Register (id, email, name, password) VALUES (?, ?, ?, ?)`;
        const uuid = crypto.randomUUID().replace(/-/g, ''); // Sinh UUID không có dấu gạch ngang
        const [result] = await connection.execute(sql, [uuid, name, email, password]);
        return result;
    } catch (error) {
        console.error("Lỗi khi tạo người dùng:", error);
        throw error;
    }
};

module.exports = createUser 