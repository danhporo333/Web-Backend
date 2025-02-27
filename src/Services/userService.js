require('dotenv').config();
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import db from '../model/index.js';
const saltRounds = 10;


export const createUsers = async (email, username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await db.User.create({
            email: email,
            username: username,
            password: hashedPassword
        });
        return user;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
};

// export const loginUser = async (email, password) => {
//     try {
//         const user = await db.User.findOne({ where: { email } });

//         if (!user) {
//             throw new Error("Email không tồn tại!");
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             throw new Error("Mật khẩu không chính xác!");
//         }
//         if (!process.env.JWT_SECRET) {
//             throw new Error("JWT_SECRET không được định nghĩa! Kiểm tra file .env của bạn.");
//         }

//         const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
//             expiresIn: '1h',
//         });

//         return { token, user };
//     } catch (error) {
//         console.error("Lỗi trong service:", error);
//         throw error;
//     }
// };

export const getAllUsers = async () => {
    try {
        const users = await db.User.findAll();
        return users;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
}

export const updateUser = async (id, updatedData) => {
    try {
        const result = await db.User.update(updatedData, {
            where: {
                id: id
            }
        });
        return result;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
};