const express = require("express");
const { createUser, getUserById, getUserAll, deleteUser, updateUser } = require("../controllers/userController");
const userRouter = express.Router();
const multer = require('multer');
const authMiddleware = require("../middlewares/authMiddleware");
const upload = multer();
require("dotenv").config();

userRouter.post('/createuser', upload.none(), createUser);

userRouter.get('/userslist', getUserAll);

userRouter.get("/:userId/userView", getUserById);

userRouter.delete('/:userId/delete', deleteUser);

userRouter.get('/:userId/edit', getUserById);

userRouter.patch('/:userId/edit', upload.none(), updateUser)

module.exports = userRouter;
