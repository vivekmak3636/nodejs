const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const todoRoutes = require("./routes/todoroutes");

connectDB();
const app = express();


// Middleware
app.use(express.json());



// Routes
app.use("/api/todo", todoRoutes);


// Database Connection
app.get('/', (req, res) => {
    res.send("server is working..");
})



// Server
app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});