require('dotenv').config();
const User = require("../model/register");
const jwt = require('jsonwebtoken');
const getUserByEmail = require('../model/login');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Gọi hàm từ model để tạo người dùng
        const result = await User(name, email, hashedPassword);
        return result; // Trả về kết quả của quá trình tạo người dùng
    } catch (error) {
        console.error("Lỗi trong service:", error);
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error("Email không tồn tại!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mật khẩu không chính xác!");
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET không được định nghĩa! Kiểm tra file .env của bạn.");
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { token, user };
    } catch (error) {
        console.error("Lỗi trong service:", error);
        throw error;
    }
};




module.exports = {
    createUserService, loginUser
}