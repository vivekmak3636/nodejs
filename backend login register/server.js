const express = require("express");
const dotenv=require("dotenv")
const { connectDB }=require("./config/db")
dotenv.config();
connectDB();
const app = express();


app.get('/', (req, res) => {
    res.send("server is complety working")
})
app.listen(process.env.PORT, () => {
    console.log("server is running");
})

