const express = require("express");
const app = express();
const multer = require("multer");
const {loginAuth} = require("../controllers/authController");
const upload = multer();
const authRouter = express.Router();

authRouter.post("/log-in", upload.none() ,loginAuth)

module.exports = authRouter;