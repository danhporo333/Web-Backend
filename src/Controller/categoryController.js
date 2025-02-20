const createCategory = require('../model/category');

const addCategory = async (req, res) => {
    try {
        const { name, description, parent_id, image } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name) {
            return res.status(400).json({
                message: "Tên danh mục không được để trống!"
            });
        }

        const id = await createCategory(name, description, parent_id, image);
        res.status(201).json({
            message: "Danh mục đã được thêm thành công!",
            category_id: id
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        });
    }
};

module.exports = addCategory;