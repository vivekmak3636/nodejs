const userModel=require('./../model/userModel');

const insertUser=async(req,res)=>{
    let data=req.body;
    let response=await userModel.create(data);
    res.json(response);

}
const updateUser=async(req,res)=>{

    let data=req.body;
    let response=await userModel.updateOne({username:data.username},{$set:data});
    res.json(response);


}
const deleteUser=async(req,res)=>{
    let data=req.body;
    let response=await userModel.deleteOne({username:data.username});
    res.json(response);
}
const   getUsers=async(req,res)=>{

    let data=await userModel.find();
    res.json(data);


}
const getUser=async(req,res)=>{

        let id=req.params.id;
        let response =await userModel.findOne({_id:id});
        res.json(response);


}
module.exports={insertUser,updateUser,deleteUser,getUsers,getUser};

