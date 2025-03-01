import path from 'path';
import fs from 'fs';
import { uploadSingleFile } from '../Services/fileService.js';
import { createProduct, getAllProducts, deleteProduct, updateProduct } from '../Services/productService.js';
import e from 'express';

export const createProductController = async (req, res) => {

    try {
        const { name, description, stock, price, categoryId } = req.body;

        let imageUrl = "";

        if (!req.files || Object.keys(req.files).length === 0) {

        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.name;
        }

        const productData = { name, description, stock, price, categoryId, image: imageUrl };

        const product = await createProduct(productData);
        return res.status(201).json({
            errorCode: 0,
            message: 'Product created successfully!',
            product: product
        });
        // return res.send("creat a product");
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to create product.',
            error: error.message
        });
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProducts();
        const productCount = products.length;
        return res.status(200).json({
            errorCode: 0,
            message: 'Success!',
            data: {
                productCount: productCount,
                products: products
            }
        });
    } catch (error) {
        console.error("Error getting all products:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to get all products.'
        });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await deleteProduct(id);
        if (result === 0) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Product not found!'
            });
        }
        return res.status(200).json({
            errorCode: 0,
            message: 'Product deleted successfully!',
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to delete product.'
        });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { id, name, description, stock, price, categoryId } = req.body;
        let imageUrl = "";

        if (!req.files || Object.keys(req.files).length === 0) {
            imageUrl = "";
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.name;
        }

        const updatedData = { name, description, stock, price, categoryId, image: imageUrl };
        const result = await updateProduct(id, updatedData);
        if (result[0] === 0) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Product not found!'
            });
        }
        return res.status(200).json({
            errorCode: 0,
            message: 'Product updated successfully!',
            data: result
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to update product.'
        });
    }
};