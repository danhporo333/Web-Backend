require('dotenv').config();
const express = require('express'); //commonjs
const cors = require("cors");
const apiRoutes = require('./Routes/api');

const app = express();// app express
const port = process.env.PORT || 8888; //port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;

//config req.body
app.use(cors());//Cho phép tất cả nguồn gọi API
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//khai báo route
app.use('/v2/api/', apiRoutes);// thêm tiền tố để biết đang gọi api

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})