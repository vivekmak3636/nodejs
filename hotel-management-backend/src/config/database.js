const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://cosmos_bvn:Cosmos1234@ac-adzdffp-shard-00-00.7lfjkfr.mongodb.net:27017,ac-adzdffp-shard-00-01.7lfjkfr.mongodb.net:27017,ac-adzdffp-shard-00-02.7lfjkfr.mongodb.net:27017/?ssl=true&replicaSet=atlas-rmpsnp-shard-0&authSource=admin&appName=Cluster0", {

        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;