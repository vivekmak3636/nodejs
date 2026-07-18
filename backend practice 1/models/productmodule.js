const mongoose = require("mongoose");

const productmodule = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pid: {
        type: Number,
        unique: true,
    },
    pdetail: {
        type: String,
        required: true
    }
})
let productmodules = mongoose.model("productinformation", productmodule);
module.exports = productmodules;