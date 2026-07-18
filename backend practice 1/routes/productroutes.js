const express = require("express")
const { insertproduct, updateproduct, deleteproduct, getproduct, getproducts } = require("./../controler/productcontroller");
const router = express.Router();

router.get("/product/:id", getproduct);
router.get("/products", getproducts);
router.post("/product", insertproduct);
router.put("/product", updateproduct);
router.delete("/product", deleteproduct);

module.exports = router;