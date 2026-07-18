const express=require('express');

const {insertUser,updateUser,deleteUser,getUser,getUsers}=require('./../controller/userController');

const router=express.Router();

router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',insertUser);
router.put('/users',updateUser);
router.delete('/users',deleteUser);

module.exports={router};