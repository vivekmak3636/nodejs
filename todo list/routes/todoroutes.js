const express = require("express");

const router = express.Router();


const {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo

} = require("../controller/controller");



// Create Todo
router.post("/", createTodo);


// Get All Todo
router.get("/", getTodo);


// Get Single Todo
router.get("/:id", getSingleTodo);


// Update Todo
router.put("/:id", updateTodo);


// Delete Todo
router.delete("/:id", deleteTodo);



module.exports = router;