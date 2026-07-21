const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");


const authRouter =
    require("./routes/auth-router");


const productRouter =
    require("./routes/product-router");


const orderRouter =
    require("./routes/order-router");


dotenv.config();


connectDB();


const app = express();


app.use(cors());


app.use(express.json());


app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Mall Backend API is Running"

    });

});


app.use(

    "/api/auth",

    authRouter

);


app.use(

    "/api/products",

    productRouter

);


app.use(

    "/api/orders",

    orderRouter

);


const PORT = process.env.PORT || 5000;


app.listen(

    PORT,

    () => {

        console.log(

            `Server running on port ${PORT}`

        );

    }

);