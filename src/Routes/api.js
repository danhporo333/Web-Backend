const express = require('express');
const routerAPI = express.Router();

const { createUser, Login } = require('../Controller/userController');
const { addProduct, getAllProducts } = require('../Controller/productController');
const addCategory = require("../Controller/categoryController");
const postUploadSingleFileApi = require("../Controller/fileController");


routerAPI.post('/register', createUser);

routerAPI.post('/login', Login);

routerAPI.post('/product', addProduct);

routerAPI.post("/category", addCategory);

routerAPI.post('/file', postUploadSingleFileApi);

routerAPI.get('/product-all', getAllProducts);

module.exports = routerAPI; 