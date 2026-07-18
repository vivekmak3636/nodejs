const { MongoClient, ObjectId } = require('mongodb');
const { connectdb } = require("./config/db");
const { objectID } = require("mongodb");
const express = require("express")

const app = express();
app.use(express.json()); // middleware

app.get('/', (req, res) => {
    res.send("** DEFAULT PAGE **  ")
});
app.get("/product", async (req, res) => {
    let product = await connectdb();
    let data = await product.find().toArray();
    res.json(data);
})
app.get("/product/:id", async (req, res) => {
    let id = req.params.id;
    let product = await connectdb();
    let data = await product.find({ _id: new ObjectId(id) }).toArray();
    res.json(data);
})
app.post("/product", async (req, res) => {
    let product = await connectdb();
    let data = req.body;
    if (!data.image || !data.rating || !data.size || !data.color || !data.name || !data.price || !data.description || !data.category || !data.quantity || !data.stock) {
        return res.json({
            message: "Product name,price,description is required"
        })
    }
    let reasponse = await product.insertOne(data);
    res.json({
        msg: "**DATA IS INSERTED**",
        data: reasponse
    })
})
app.put("/product/:id", async (req, res) => {
    let product = await connectdb();
    let id = req.params.id;
    let data = req.body;
    let reasponse = await product.updateOne({ _id: new ObjectId(id) }, { $set: data })
    res.json({
        msg: "**DATA IS UPDATED**",
        data: reasponse
    })
})
app.delete("/product/:id", async (req, res) => {
    let product = await connectdb();
    let id = req.params.id;
    let reasponse = await product.deleteOne({ _id: new ObjectId(id) })
    let data = await product.find().toArray();
    res.json({
        msg: "**DATA IS DELETED**",
        data: data
    })
})
app.listen(5000, () => {
    console.log("*=*SERVER IS RUNNING ON 5000*=*");

})