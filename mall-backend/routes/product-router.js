const express = require("express");

const router = express.Router();


const {

    addProduct,

    getProducts,

    updateStock,

    deleteProduct

} = require("../controllers/product-controller");


const {

    authMiddleware,

    adminMiddleware

} = require("../middleware/auth-middleware");


// PUBLIC
router.get(
    "/",
    getProducts
);


// ADMIN ONLY
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    addProduct
);


router.patch(
    "/stock/:id",
    authMiddleware,
    adminMiddleware,
    updateStock
);


router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
);


module.exports = router;