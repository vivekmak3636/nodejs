const express = require('express');
const { RegisterUser, LoginUser, getUsers, getUserInfo } = require('./../controller/userController');
const authMiddleware = require('./../middleware/authMiddleware');
const router = express.Router();

router.get('/', getUsers);
router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.get("/profile", authMiddleware, getUserInfo);
module.exports = router;
