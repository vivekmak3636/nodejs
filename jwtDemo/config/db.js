const mongoose = require('mongoose');

const url = process.env.MONGO_URL || "mongodb+srv://cosmos_bvn:Cosmos1234@cluster0.7lfjkfr.mongodb.net/?appName=Cluster0";

const connectDB = async () => {

    let result = await mongoose.connect(url);
    console.log("database connected...");
}

module.exports = { connectDB };
