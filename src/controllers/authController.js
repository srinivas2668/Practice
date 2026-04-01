const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // make sure installed
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;


const loginAuth = async (req, res, next) => {
    try {
        const { username, password } = req?.body;
        const user = await User.findOne({
            where: { email: username }
        });
        const isMacth = await bcrypt.compare(password, user?.dataValues?.password)
        if (!isMacth) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        console.log(SECRET, 'fasdfjlsakdjfksdf')
        const token = jwt.sign(
            { id: user?.dataValues?.id },
            SECRET,
            { expiresIn: "1h" }
        )
        res.json({
            message: "login sucess",
            data: user,
            token: token
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

const protectData = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: Token missing"
            });
        }
        const decoded = jwt.verify(token, SECRET);
        const { id } = decoded;
        req.user = id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token"
        });
    }
};

module.exports = { loginAuth, protectData };