
// const { createUserService, loginUser } = require("../Services/userService");
import { createUserService, loginUser } from "../Services/userService.js";

// const createUser = async (req, res) => {
//     // console.log("check req.body ", req.body);
//     const { name, email, password } = req.body;

//     try {
//         // Gọi service để tạo người dùng
//         const result = await createUserService(name, email, password);
//         console.log("data: ", result);
//         // Trả về phản hồi thành công
//         return res.status(200).json({
//             errorCode: 0,
//             message: 'Đăng ký thành công!',
//             user: {
//                 email: email,
//                 name: name,
//                 password: password
//             }
//         });
//     } catch (error) {
//         console.error("Lỗi khi đăng ký:", error);
//         return res.status(500).json({
//             errorCode: 2,
//             message: 'Lỗi máy chủ! Không thể tạo người dùng.'
//         });
//     }

// }

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const result = await createUserService(name, email, password);
        console.log("data: ", result);
        return res.status(200).json({
            errorCode: 0,
            message: 'Đăng ký thành công!',
            user: {
                email: email,
                name: name,
                password: password
            }
        });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        return res.status(500).json({
            errorCode: 2,
            message: 'Lỗi máy chủ! Không thể tạo người dùng.'
        });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);

        return res.status(200).json({
            errorCode: 0,
            message: 'Đăng nhập thành công',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            },
        });
    } catch (error) {
        return res.status(400).json({
            errorCode: 1,
            message: error.message
        });
    }
}

// const Login = async (req, res) => {

//     try {
//         const { email, password } = req.body;
//         const { token, user } = await loginUser(email, password);

//         return res.status(200).json({
//             errorCode: 0,
//             message: 'Đăng nhập thành công',
//             data: {
//                 token,
//                 user: {
//                     id: user.id,
//                     email: user.email,
//                     name: user.name
//                 }
//             },

//         });
//     } catch (error) {
//         return res.status(400).json({
//             errorCode: 1,
//             message: error.message
//         });
//     }
// }

// module.exports = {
//     createUser, Login
// }