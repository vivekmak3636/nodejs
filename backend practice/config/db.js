const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb+srv://cosmosbvn_db_user:Cosmos1234@cluster0.7lfjkfr.mongodb.net/?appName=Cluster0");

async function connectdb() {
    let result = await client.connect();
    let db = result.db("PRODUCT_SECTION");
    return db.collection("product")
}

module.exports = {
    connectdb
}