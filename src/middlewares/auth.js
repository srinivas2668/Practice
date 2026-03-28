const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const err = new Error("No token provided");
            err.statusCode = 401;
            throw err;
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET);

        return res.status(200).json({
            message: 'Valid Authentication',
            user: decoded
        });

    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
};