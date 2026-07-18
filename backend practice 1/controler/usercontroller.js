const usermodule = require("./..//models/usermodule");

// for insert user information
const insertuser = async(req, res) => {
    let data = req.body;
    let response = await usermodule.create(data);
    res.json(response)
}
//for update usert data
const updateuser = async (req, res) => {
    let data = req.body;
    let response = await usermodule.updateOne({ username: data.username }, { $set: data });
    res.json(response)
}
// for delete user data
const deleteuser = async (req, res) => {
    let data = req.body;
    let response = await usermodule.deleteOne({ username: data.username });
    res.json(response)
}
//for multiple user data
const getusers = async (req, res) => {
    let response = await usermodule.find();
    res.json(response)
}

//for single user data
const getuser = async (req, res) => {

    let id = req.params.id;
    let response = await userModel.findOne({ _id: id });
    res.json(response);


}
module.exports = { insertuser ,updateuser,deleteuser,getuser,getusers};
