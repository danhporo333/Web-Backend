import { loginUser, createUsers, getAllUsers, deleteUser, updateUser } from "../Services/userService.js";



export const createUserController = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const result = await createUsers(email, username, password);
        return res.status(201).json({
            errorCode: 0,
            message: 'User created successfully!',
            user: {
                email: email,
                username: username,
                password: result.password
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to create user.'
        });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        const userCount = users.length;
        return res.status(200).json({
            errorCode: 0,
            message: 'Success!',
            data: {
                userCount: userCount,
                users: users
            }
        });
    } catch (error) {
        console.error("Error getting all users:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to get all users.'
        });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await deleteUser(id);
        if (result === 0) {
            return res.status(404).json({
                errorCode: 1,
                message: 'User not found!'
            });
        }
        return res.status(200).json({
            errorCode: 0,
            message: 'User deleted successfully!',
            data: result
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to delete user.'
        });
    }
}

export const updateUserController = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedData = req.body;
        const result = await updateUser(id, updatedData);
        if (result[0] === 0) {
            return res.status(404).json({
                errorCode: 1,
                message: 'User not found!'
            });
        }
        return res.status(200).json({
            errorCode: 0,
            message: 'User updated successfully!',
            data: result
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to update user.'
        });
    }
};

// export const Login = async (req, res) => {
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