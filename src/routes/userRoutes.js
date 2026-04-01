const express = require("express");
const { createUser, getUserById, getUserAll, deleteUser, updateUser } = require("../controllers/userController");
const userRouter = express.Router();
const multer = require('multer');
const User = require("../models/User");
const { protectData } = require("../controllers/authController");
const upload = multer();

userRouter.post('/createuser', upload.none(), protectData, createUser);

userRouter.get('/userslist', protectData, getUserAll);

userRouter.get("/:userId/userView", protectData, getUserById);

userRouter.delete('/:userId/delete', protectData, deleteUser);

userRouter.get('/:userId/edit', protectData, getUserById);

userRouter.patch('/:userId/edit', upload.none(), protectData, updateUser)

module.exports = userRouter;
