const userModel = require('./../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {

    let data = req.body;

    if (!data.username || !data.email || !data.password) {
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }
    let hashpassword = await bcrypt.hash(data.password, 10);
    let newdata = { username: data.username, email: data.email, password: hashpassword };
    let result = await userModel.create(newdata);
    res.json({
        success: true,
        result: result
    })

}

const LoginUser = async (req, res) => {

    let data = req.body;

    if (!data.username || !data.password) {
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }


    let user = await userModel.findOne({ username: data.username });
    console.log(user);
    if (!user) {
        return res.json({
            sucess: false,
            message: "No user Found"
        })
    }

    let result = await bcrypt.compare(data.password, user.password);

    if (!result) {
        return res.json({
            sucess: false,
            message: "Invalid Password"
        })
    }
    let token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.SECREET_KEY);
    res.json({
        sucess: true,
        message: "Login Sucessfull",
        token
    })

}
const getUsers = async (req, res) => {

    let users = await userModel.find();
    res.json({
        sucess: true,
        count: users.length,
        data: users
    })
}
const getUserInfo = async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
        return res.json({
            success: false,
            message: "User not found"
        });
    }
    res.json({
        success: true,
        data: user
    });

};

module.exports = {
    RegisterUser, LoginUser, getUsers, getUserInfo
}