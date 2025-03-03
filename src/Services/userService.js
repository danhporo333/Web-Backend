require('dotenv').config();
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import db from '../model/index.js';
import Model from 'sequelize/lib/model';
const saltRounds = 10;

//check người dùng trong hệ thống
const checkExistingUser = async (email, username) => {
    const existingUsers = await db.User.findAll({
        where: {
            [db.Sequelize.Op.or]: [
                { email: email },
                { username: username }
            ]
        }
    });

    if (existingUsers.length > 0) {
        const errors = [];
        existingUsers.forEach(user => {
            if (user.email === email) errors.push("Email đã được sử dụng");
            if (user.username === username) errors.push("Tên người dùng đã được sử dụng");
        });
        throw new Error(errors.join(" và "));
    }
};

export const assignRoleToUser = async (userId, roleName) => {
    try {
        if (!roleName) {
            throw new Error("Role name is required");
        }

        const role = await db.Role.findOne({ where: { name: roleName } });
        if (!role) {
            throw new Error("Role not found");
        }
        await db.UserRole.create({
            userId: userId,
            roleId: role.id
        });
    } catch (error) {
        console.error("Error assigning role:", error);
        throw error;
    }
};

export const createUsers = async (email, username, password, phone) => {
    try {
        await checkExistingUser(email, username);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await db.User.create({
            email,
            username,
            password: hashedPassword,
            phone
        });
        return user;
    } catch (error) {
        return {
            status: 'error',
            message: error.message
        };
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
        const users = await db.User.findAll({
            include: [{
                model: db.Role,
                attributes: ['name'],
                through: { attributes: [] }
            }]
        });
        return users;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const result = await db.User.destroy({
            where: { id: id }
        });
        return result;
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