const mongose = require('mongoose');
let userchema = new mongose.Schema({
    name: {
        type: String,
        required: true,
        notEmpty: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
let usermodel = mongose.model('user', userchema);
module.exports = usermodel;