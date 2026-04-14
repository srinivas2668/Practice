const express = require("express");
const { LogIn, SingUp } = require("../controllers/authLogin.controller");
const route = express.Router();

route.post("/log-in", LogIn);
route.post("/sign-up", SingUp);

module.exports = route;
