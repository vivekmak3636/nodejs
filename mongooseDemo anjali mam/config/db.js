const mongoose=require('mongoose');
const connectDB=async ()=>{

    let result=await mongoose.connect(process.env.MONGO_URL);
    // console.log(result);
    console.log("database connected successfully");
    
}

module.exports=connectDB;