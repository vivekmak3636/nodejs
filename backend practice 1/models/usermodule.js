const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    gender: {
        type:String,
        required:true
    }
})
let usermodule = mongoose.model("usersinformation", userschema);
module.exports = usermodule;