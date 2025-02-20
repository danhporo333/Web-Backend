const { v4: uuidv4 } = require("uuid");
const createFile = require('../model/file');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Vui lòng chọn file!" });
        }

        const id = uuidv4();
        const filePath = `/public/image/${req.file.filename}`;

        const created_at = new Date(); // Lấy thời gian hiện tại
        await createFile(id, req.file.filename, filePath, created_at);
        res.status(201).json({ message: "Tải ảnh thành công!", file_id: id, path: filePath, created_at });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = uploadImage;