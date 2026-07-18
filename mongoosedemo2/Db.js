const mongoose = require('mongoose');
const connectMongoDB = async () => { 
    let result = await mongoose.connect(process.env.MOGOOSE_URL )
    console.log("+++MongoDB connected successfully+++");
}
module.exports = connectMongoDB;
