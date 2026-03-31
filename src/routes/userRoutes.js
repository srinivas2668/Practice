const express = require("express");
const { createUser, getUserById, getUserAll, deleteUser, updateUser } = require("../controllers/userController");
const userRouter = express.Router();
const multer = require('multer');
const User = require("../models/User");
const upload = multer();

userRouter.post('/createuser', upload.none(), createUser);

userRouter.get('/userslist', getUserAll);

userRouter.get("/:userId/userView", getUserById)

userRouter.delete('/:userId/delete', deleteUser)

userRouter.put('/:userId/edit', upload.none() ,getUserById ,updateUser)

module.exports = userRouter;
