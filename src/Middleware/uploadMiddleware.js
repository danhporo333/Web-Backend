const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/image/');
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = uuidv4() + path.extname(file.originalname);
        cb(null, file.originalname);
    }
});
// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ hỗ trợ file ảnh!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;