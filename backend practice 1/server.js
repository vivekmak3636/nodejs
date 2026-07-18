const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db")
const routeruser  = require('./routes/userroutes');
const routerproduct = require('./routes/productroutes');
const app = express();
app.use(express.json());

dotenv.config();
app.use("/api/auth", routeruser);
app.use("/api/check", routerproduct);
connectDb();

app.get('/', (req, res) => {
    res.send("server is working..");
})

app.listen(process.env.PORT, () => {
    console.log("server is wokring...");

})