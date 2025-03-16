import { where } from "sequelize/lib/sequelize";
import db from "../model/index.js";
import Model from "sequelize/lib/model";

export const createProduct = async (productData) => {
    try {
        console.log("🔥 Data before saving to DB:", productData);
        const product = await db.Product.create({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            stock: productData.stock,
            categoryId: productData.categoryId,
            image: productData.image
        });
        console.log("✅ Saved product:", product);
        return product;

    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const products = await db.Product.findAll({
            include: [{ model: db.Category, attributes: ['name'] }]
        });
        return products;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        const product = await db.Product.findByPk(id, {
            include: [{
                model: db.Category,
                attributes: ['name']
            }]
        });
        return product;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const result = await db.Product.destroy({
            where: { id: id }
        });
        return result;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
}

export const updateProduct = async (id, productData) => {
    try {
        const result = await db.Product.update({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            stock: productData.stock,
            categoryId: productData.categoryId,
            image: productData.image
        }, {
            where: { id: id }
        });
        console.log("🚀 Updated product:", result);
        return result;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
}