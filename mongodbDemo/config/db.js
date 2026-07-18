clsconst { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb+srv://cosmosbvn_db_user:Cosmos1234@cluster0.7lfjkfr.mongodb.net/?appName=Cluster0");


async function connectDB() {
    let result = await client.connect();
    // console.log("successfully");
    // console.log(result);
    let db = result.db("ecommerce");
    return db.collection("product");
}

module.exports = {
    connectDB
}
