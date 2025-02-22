const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { uploadSingleFile } = require('../Services/fileService')
const productService = require('../Services/productService');

const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock_quantity, category_id } = req.body;
        // console.log("Request body: ", req.body);
        const id = uuidv4(); // Tạo UUID cho sản phẩm mới

        let imageUrl = "";

        if (!req.files || Object.keys(req.files).length === 0) {

        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
            // console.log("check result =", result)
        }
        console.log("SQL Params:", { id, name, description, price, stock_quantity, category_id, imageUrl });

        let productData = { id, name, description, price, stock_quantity, category_id, image: imageUrl }

        // await productService(productData);
        let product = await productService.createProductService(productData);

        // return res.status(200).json(
        //     {
        //         EC: 0,
        //         data: { id, name, description, price, stock_quantity, category_id, image: imageUrl }
        //     }
        // )
        return res.status(201).json({
            EC: 0,
            data: product // Trả về thông tin sản phẩm đã thêm
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        let productall = await productService.getAllProductService();
        // console.log('check product', productall)
        return res.status(200).json({
            EC: 0,
            data: productall
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
}

module.exports = {
    addProduct, getAllProducts
};