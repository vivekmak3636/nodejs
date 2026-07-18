const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        unique:true
    }
});
let userModel=mongoose.model("userInformation",userSchema);
module.exports=userModel;
