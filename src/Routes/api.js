const express = require('express');
const routerAPI = express.Router();
const uploadImage = require('../Controller/uploadController');
const upload = require('../Middleware/uploadMiddleware');
const { createUser, Login } = require('../Controller/userController');
const addProduct = require('../Controller/productController');
const addCategory = require("../Controller/categoryController");


routerAPI.post('/register', createUser);

routerAPI.post('/login', Login);

routerAPI.post('/product', addProduct);

routerAPI.post('/upload', upload.single("image"), uploadImage);

routerAPI.post("/category", addCategory);


module.exports = routerAPI; 