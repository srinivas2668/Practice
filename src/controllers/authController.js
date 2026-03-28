const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET = process.env.JWT_SECRET;

const useVaultCredentials = [
    {
        username: "admin",
        password: "Admin@123",
        userId: 1,
        note: 'this is admin note'
    },
    {
        username: "srinu",
        password: "Srinu@123",
        userId: 2,
        note: 'this is srinu note'
    },
    {
        username: "kavya",
        password: "Kavya@123",
        userId: 3,
        note: 'this is kavya note'
    },
    {
        username: "harish",
        password: "Harish@123",
        userId: 4,
        note: 'this is harish note'
    },
    {
        username: "balu",
        password: "Balu@123",
        userId: 5,
        note: 'this is balu note'
    }
]

exports.vaultLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const nameRegX = /^[a-zA-Z0-9_-]{3,16}$/;
        const passwordRegX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
        console.log(User,'sdflsdlfkjsdf')

        const user = await User.findOne({ 
            where: { 
                username: username,
                password: password // Note: In industry, we use bcrypt.compare here
            } 
        });
        console.log(User,'fsdlfjsldkfjsd')

        if (!username || !password) {
            res.send("Please fill all input fields")
        }
        if (!nameRegX.test(username)) {
            res.send("Enter a valid username (3-16 characters, alphanumeric)")
        }
        if (!passwordRegX.test(password)) {
            res.send("Password must include uppercase, lowercase, number, and symbol")
        }

        const dataObj = useVaultCredentials.find((ele) => {
            return (ele.username === username && ele.password === password) && ele
        })

        if (dataObj) {
            const token = jwt.sign(
                { userId: dataObj.userId },
                SECRET,
                { expiresIn: "2h" }
            )
            res.json({
                message: "Log In successfully",
                token,
                data: dataObj
            })
        }
    }
    catch (error) {
        next(error);
    }
}