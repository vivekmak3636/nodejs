const productmodule = require("./..//models/productmodule");

// for insert product information
const insertproduct = async(req, res) => {
    let data = req.body;
    let response = await productmodule.create(data);
    res.json(response)
}
//for update product data
const updateproduct = async (req, res) => {
    let data = req.body;
    let response = await productmodule.updateOne({ username: data.username }, { $set: data });
    res.json(response)
}
// for delete product data
const deleteproduct = async (req, res) => {
    let data = req.body;
    let response = await productmodule.deleteOne({ username: data.username });
    res.json(response)
}
//for multiple product data
const getproducts = async (req, res) => {
    let response = await productmodule.find();
    res.json(response)
}

//for single product data
const getproduct = async (req, res) => {

    let id = req.params.id;
    let response = await productmodule.findOne({ _id: id });
    res.json(response);


}
module.exports = { insertproduct ,updateproduct,deleteproduct,getproduct,getproducts};
