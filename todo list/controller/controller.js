const Todo = require("../model/todomodel");


// Create Todo
const createTodo = async (req, res) => {

    try {

        let data = req.body;

        let todo = await Todo.create(data);

        res.json({
            message: "Todo Created",
            data: todo
        });

    }
    catch (error) {
        res.json(error);
    }

}



// Get All Todo

const getTodo = async (req, res) => {

    try {

        let data = await Todo.find();

        res.json(data);

    }
    catch (error) {
        res.json(error);
    }

}



// Get Single Todo

const getSingleTodo = async (req, res) => {

    try {

        let data = await Todo.findById(req.params.id);

        res.json(data);

    }
    catch (error) {
        res.json(error);
    }

}



// Update Todo

const updateTodo = async (req, res) => {

    try {

        let data = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.json({
            message: "Todo Updated",
            data: data
        });

    }
    catch (error) {
        res.json(error);
    }

}



// Delete Todo

const deleteTodo = async (req, res) => {

    try {

        await Todo.findByIdAndDelete(req.params.id);


        res.json({
            message: "Todo Deleted"
        });

    }
    catch (error) {
        res.json(error);
    }

}



module.exports = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
};