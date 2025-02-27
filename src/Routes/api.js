// const express = require('express');
// const routerAPI = express.Router();
import express from 'express';
const routerAPI = express.Router();

// const { createUser, Login } = require('../Controller/userController');
import {
    createUser, Login, createUserController,
    getAllUsersController, deleteUserController,
    updateUserController
} from "../Controller/userController.js";
import { uploadFileController } from "../Controller/fileController.js";
// const { addProduct, getAllProducts } = require('../Controller/productController');
// import { addProduct, getAllProducts } from "../Controller/productController.js";
// const addCategory = require("../Controller/categoryController");
// import { addCategory } from "../Controller/categoryController.js";
// const postUploadSingleFileApi = require("../Controller/fileController");
// import { postUploadSingleFileApi } from "../Controller/fileController.js";


// routerAPI.post('/register', createUser);

// routerAPI.post('/login', Login);

// routerAPI.post('/product', addProduct);

// routerAPI.post("/category", addCategory);

// routerAPI.post('/file', postUploadSingleFileApi);

// routerAPI.get('/product-all', getAllProducts);

routerAPI.post('/register', createUserController);

routerAPI.get('/user-all', getAllUsersController);

routerAPI.delete('/delete', deleteUserController);

routerAPI.put('/update', updateUserController);

routerAPI.post('/file', uploadFileController);

module.exports = routerAPI; 