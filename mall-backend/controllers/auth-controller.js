const User = require("../models/user-model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER
const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "Email already registered"

            });
        }


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role

        });


        res.status(201).json({

            success: true,

            message: "User registered successfully",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};



// LOGIN
const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user = await User.findOne({
            email
        });


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });
        }


        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isPasswordCorrect) {

            return res.status(401).json({

                success: false,

                message: "Invalid password"

            });
        }


        const token = jwt.sign(

            {
                id: user._id,

                email: user.email,

                role: user.role

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};


module.exports = {
    registerUser,
    loginUser
};