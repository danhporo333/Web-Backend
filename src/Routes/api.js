const express = require('express');
const routerAPI = express.Router();

// const { getUsersAPI } = require('../controllers/apiController');
const { createUser, Login } = require('../Controller/userController');


// routerAPI.get('/users', getUsersAPI);

routerAPI.post('/register', createUser);

routerAPI.post('/login', Login);


module.exports = routerAPI; 