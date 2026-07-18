const mongoose = require("mongoose");
let userschema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
let UserModel = mongoose.model("UserData", userSchema);
module.exports = UserModel