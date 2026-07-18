const mongoose = require("mongoose");
const connectDb = async () => {
    let result = await mongoose.connect(process.env.MONGO_URL);
    console.log("DATABASE CDONNECT SUCCESSFULY");
}
module.exports = connectDb;