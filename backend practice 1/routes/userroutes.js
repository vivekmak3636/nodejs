const express=require("express")
const { insertuser, updateuser, deleteuser, getuser, getusers } = require("../controler/usercontroller");
const usersrouter = express.Router();

usersrouter.get("/user/:id", getuser);
usersrouter.get("/users", getusers);
usersrouter.post("/users", insertuser);
usersrouter.put("/users", updateuser);
usersrouter.delete("/users", deleteuser);

module.exports = usersrouter;