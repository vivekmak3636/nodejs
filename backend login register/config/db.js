const mongoose = require("mongoose");
const connectDB = async()=>{
    let result = await mongoose.connect();
    console.log("database connect successfuly ");
}
module.exports = { connectDB }