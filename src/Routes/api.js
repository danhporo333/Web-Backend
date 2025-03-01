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
    deleteProductController, updateProductController
} from "../Controller/productController.js";
// routerAPI.post('/register', createUser);
// routerAPI.post('/login', Login);

// Api cho category
routerAPI.post("/category", createCategoryController);
routerAPI.get('/category-all', getAllCategoriesController);
routerAPI.delete('/delete-category', deleteCategoryController);
routerAPI.put('/update', updateCategoryController);

//api cho product
routerAPI.post('/product', createProductController);
routerAPI.get('/product-all', getAllProductsController);
routerAPI.delete('/delete-product', deleteProductController);
routerAPI.put('/update-product', updateProductController);

//Ai cho user
routerAPI.post('/register', createUserController);
routerAPI.get('/user-all', getAllUsersController);
routerAPI.delete('/delete-user', deleteUserController);
routerAPI.put('/update', updateUserController);
routerAPI.post('/file', uploadFileController);

module.exports = routerAPI; 