//You are importing MongoClient from the mongodb package.
const { MongoClient } = require("mongodb");
//You are creating a new MongoDB client instance with a connection string (URI).
const client = new MongoClient("mongodb+srv://cosmosbvn_db_user:Cosmos1234@cluster0.7lfjkfr.mongodb.net/?appName=Cluster0");

//You define an asynchronous function because database connection takes time.
async function connectdb() {
    //This actually connects your Node.js app to MongoDB Atlas.
    let result = await client.connect();  
    //You are selecting a database named "mall" iff there is note createed automaticaly created
    let db = result.db("mall")
    //You are selecting a collection named "product"
    return db.collection("product")
}
//export data from here
module.exports = {
    connectdb
}