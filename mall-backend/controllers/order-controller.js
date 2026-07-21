const Order = require("../models/order-model");

const Product = require("../models/product-model");


// CREATE ORDER
const createOrder = async (req, res) => {

    try {

        const {
            products,
            shippingAddress
        } = req.body;


        let totalAmount = 0;

        const orderProducts = [];


        for (const item of products) {

            const product = await Product.findById(
                item.product
            );


            if (!product) {

                return res.status(404).json({

                    success: false,

                    message: "Product not found"

                });
            }


            if (product.stock < item.quantity) {

                return res.status(400).json({

                    success: false,

                    message:
                        `${product.name} has insufficient stock`

                });
            }


            totalAmount +=
                product.price * item.quantity;


            orderProducts.push({

                product: product._id,

                quantity: item.quantity,

                price: product.price

            });


            product.stock -= item.quantity;


            await product.save();

        }


        const order = await Order.create({

            user: req.user.id,

            products: orderProducts,

            totalAmount,

            shippingAddress

        });


        res.status(201).json({

            success: true,

            message: "Order created successfully",

            order

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};



// GET MY ORDERS
const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id

        }).populate("products.product");


        res.status(200).json({

            success: true,

            orders

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};



// GET ALL ORDERS - ADMIN
const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            .populate("user", "name email")

            .populate("products.product");


        res.status(200).json({

            success: true,

            orders

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};



// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {

    try {

        const {
            status
        } = req.body;


        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {
                status
            },

            {
                new: true
            }

        );


        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });
        }


        res.status(200).json({

            success: true,

            message: "Order status updated",

            order

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};


module.exports = {

    createOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus

};