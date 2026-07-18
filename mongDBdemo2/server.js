//You import Express.js, a Node.js framework.
const express = require("express")
//Your custom function to connect MongoDB
const { connectdb } = require("./config/mongodb");
const { ObjectId } = require("mongodb");
//Creates your Express application instance.
const app = express();
//Allows your server to read JSON data from requests
app.use(express.json())


//***Used to test server is running***
app.get('/', (req, res) => {
    res.send("server is wroking on 5000")
})


//***Fetch all products from MongoDB***
app.get("/product",async (req, res) => {
    let product = await connectdb();//Connect to database
    let data = await product.find().toArray();//gets all documents converts cursor into array
    res.json(data);//Sends data as JSON response to frontend
})


//***Used to insert new product***
app.post("/product", async(req, res) => {
    let product = await connectdb();//Connect to database
    let data = req.body;//contains data sent by user
    let response = await product.insertOne(data);//Inserts document into MongoDB
    res.json({
        MASSAGE: "**YOUR DATA IS INSERTED SUCCESFULY**",
        data:response,
    })//Sends data as JSON response to frontend
})

//Update product using ID
app.put('/product/:id', async (req, res) => {
    let product = await connectdb();//Connect to database
    let id = req.params.id;//Gets ID from URL
    let data = req.body;//New updated data from user
    let response = await product.updateOne({ _id: new ObjectId(id) }, { $set: data });
    res.json({
        MASSAGE: "**YOUR DATA IS UPDATED SUCCESFULY**",
        data: response,
    })//Sends data as JSON response to frontend
})


//Deletes product using ID
app.delete('/product/:id', async (req, res) => {
    let product = await connectdb();//Connect to database
    let id = req.params.id;//Gets ID from URL
    let data = req.body;//New updated data from user
    let response = await product.deleteOne({ _id: new ObjectId(id) }, { $set: data });
    res.json({
        MASSAGE: "**YOUR DATA IS DELETE SUCCESFULY**",
        data: response,
    })//Sends data as JSON response to frontend
})


//Starts backend server on port 5000
app.listen(5000, () => {
    console.log("server is running");
    
});
