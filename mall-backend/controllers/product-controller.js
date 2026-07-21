const Product = require("../models/product-model");


// ADD PRODUCT
const addProduct = async (req, res) => {

    try {

        const product = await Product.create(
            req.body
        );

        res.status(201).json({

            success: true,

            message: "Product added successfully",

            product

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};



// GET ALL PRODUCTS
const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json({

            success: true,

            products

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};



// UPDATE STOCK
const updateStock = async (req, res) => {

    try {

        const {
            quantity
        } = req.body;


        const product = await Product.findByIdAndUpdate(

            req.params.id,

            {
                $inc: {
                    stock: quantity
                }
            },

            {
                new: true
            }

        );


        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });
        }


        res.status(200).json({

            success: true,

            message: "Stock updated successfully",

            product

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};



// DELETE PRODUCT
const deleteProduct = async (req, res) => {

    try {

        const product =
            await Product.findByIdAndDelete(
                req.params.id
            );


        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });
        }


        res.status(200).json({

            success: true,

            message: "Product deleted successfully"

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};


module.exports = {

    addProduct,

    getProducts,

    updateStock,

    deleteProduct

};