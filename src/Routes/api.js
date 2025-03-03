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

import {
    createRoleController, getAllRolesController,
    deleteRoleController, updateRoleController
} from "../Controller/roleController.js";
// routerAPI.post('/register', createUser);
// routerAPI.post('/login', Login);

// Api cho category
routerAPI.post("/category", createCategoryController);
routerAPI.get('/category-all', getAllCategoriesController);
routerAPI.delete('/delete-category', deleteCategoryController);
routerAPI.put('/update-category', updateCategoryController);

//api cho product
routerAPI.post('/product', createProductController);
routerAPI.get('/product-all', getAllProductsController);
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

module.exports = routerAPI; 