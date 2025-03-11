import express from 'express';
const routerAPI = express.Router();
import {
    createUser, Login, createUserController,
    getAllUsersController, deleteUserController,
    updateUserController
} from "../Controller/userController.js";
import { uploadFileController } from "../Controller/fileController.js";
import {
    createCategoryController, getAllCategoriesController,
    deleteCategoryController, updateCategoryController
} from "../Controller/categoryController.js";

import {
    createProductController, getAllProductsController,
    getProductByIdController, deleteProductController, updateProductController
} from "../Controller/productController.js";

import {
    createRoleController, getAllRolesController,
    deleteRoleController, updateRoleController
} from "../Controller/roleController.js";

import { verifyToken } from "../Middleware/authMiddleware.js"; // Thay đổi import
import { verifyTokenController } from "../Controller/authController.js"; // Thay đổi import
import {
    addToCartController, getCartController,
    getCartItemsController, removeFromCartController,
    updateCartController
} from "../Controller/cartController.js";
// routerAPI.post('/register', createUser);
routerAPI.post('/login', Login);
routerAPI.get('/verify-token', verifyTokenController);

// Api cho category
routerAPI.post("/category", createCategoryController);
routerAPI.get('/category-all', getAllCategoriesController);
routerAPI.delete('/delete-category', deleteCategoryController);
routerAPI.put('/update-category', updateCategoryController);

//api cho product
routerAPI.post('/product', createProductController);
routerAPI.get('/product-all', getAllProductsController);
routerAPI.get('/product/:id', getProductByIdController);
routerAPI.delete('/delete-product', deleteProductController);
routerAPI.put('/update-product', updateProductController);

//Api cho user
routerAPI.post('/register', createUserController);
routerAPI.get('/user-all', getAllUsersController);
routerAPI.delete('/delete-user/:id', deleteUserController);
routerAPI.put('/update-user', updateUserController);
routerAPI.post('/file', uploadFileController);

//Api cho role
routerAPI.post('/create-role', createRoleController);
routerAPI.get('/role-all', getAllRolesController);
routerAPI.delete('/delete-role', deleteRoleController);
routerAPI.put('/update-role', updateRoleController);

//Api cho cart
routerAPI.post('/cart/add', verifyToken, addToCartController);
routerAPI.get('/cart', verifyToken, getCartController);
routerAPI.get('/cart/items', verifyToken, getCartItemsController); // Add this new route
routerAPI.delete('/cart/delete/:cartItemId', verifyToken, removeFromCartController);
routerAPI.put('/cart/update/:cartItemId', verifyToken, updateCartController);


module.exports = routerAPI;