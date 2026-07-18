// const express = require('express');
// const { connectDB } = require('./config/db');
// const { ObjectId } = require('mongodb');
// const app = express();
// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send("server is working...")
// })
// app.get('/product', async (req, res) => {

//     let product = await connectDB();
//     let data = await product.find().toArray();
//     res.json(data);
// });


// app.post('/product', async (req, res) => {
//     let product = await connectDB();
//     let data = req.body;
//     let response = await product.insertOne(data);
//     res.json({
//         message: "data inserted successfully",
//         data: response
//     })
// })

// app.put('/product/:id', async (req, res) => {

//     let id = req.params.id;
//     let product = await connectDB();
//     let data = req.body;
//     let response = await product.updateOne({ _id: new ObjectId(id) }, { $set: data  })
//     res.json({
//         message: "data updated successfully",
//         data: response
//     })
// })
// app.delete('/product/:id', async (req, res) => {

//     let id = req.params.id;
//     let product = await connectDB();
//        let response = await product.deleteOne({_id:new ObjectId(id)})
//     res.status(200).json({
//         message: "data deleted successfully",
//         data: response
//     })
// })
// app.listen(5000, () => {
//     console.log("server is running");

// })





const express = require("express");
const { ObjectId } = require("mongodb");
const { connectDB } = require("./config/db");

const app = express();

app.use(express.json());


// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is working..."
    });
});


// Get All Products
app.get("/product", async (req, res) => {
    try {
        const collection = await connectDB();
        const data = await collection.find().toArray();

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// Insert Product
app.post("/product", async (req, res) => {
    try {
        const collection = await connectDB();

        const result = await collection.insertOne(req.body);

        res.status(201).json({
            success: true,
            message: "Product inserted successfully.",
            result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// Update Product
app.put("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const collection = await connectDB();

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// Delete Product
app.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const collection = await connectDB();

        const result = await collection.deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});