const express = require("express");

const router = express.Router();


const {

    createOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus

} = require("../controllers/order-controller");


const {

    authMiddleware,

    adminMiddleware

} = require("../middleware/auth-middleware");


// CUSTOMER
router.post(

    "/",

    authMiddleware,

    createOrder

);


router.get(

    "/my-orders",

    authMiddleware,

    getMyOrders

);


// ADMIN
router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getAllOrders

);


router.patch(

    "/:id/status",

    authMiddleware,

    adminMiddleware,

    updateOrderStatus

);


module.exports = router;