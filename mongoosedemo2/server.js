const express = require('express');// express
const connectDB = require('./Db');// db connection
let dotenv = require('dotenv');// dotenv
const userModel = require('./usermoel');// user model
const bcrypt = require('bcrypt');// bcrypt
const app = express();// express app
app.use(express.json())// json middlewareclsd
dotenv.config();// dotenv config
connectDB();// db connection

app.get('/', (req, res) => {
    res.send("SERVER IS RUNNING ON 5000 PORT IN LOCAL HOST");
})  

app.post('/register', async (req, res) => {
    let { name, email, password, } = req.body;
    if (!name ||!email||!password){
        return res.json({
            success: false,
            message: "ALL FIELD REQUIRE "
        })
    }
    let haspassword = await bcrypt.hash(password, 10)
    let data = {
        name, email,
        password:haspassword
    }
    let result = await userModel.create(data);
    res.json({
        sucess: true,
        message: "data inserted sucessfully",
        data: result
    })
})



let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is working...");
})
