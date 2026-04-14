const db = require("../model/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const SingUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkPoint = await db.signUp.findOne({
      where: {
        // [Op.and]: [{ username: username }, { password: password }],
        username: username,
      },
    });
    if (!checkPoint) {
      const data = await db.signUp.create(req.body);
      data.toJSON();
      return res.status(200).json({
        message: "singup sucessfully",
        data: data,
      });
    } else {
      return res.status(400).json({
        message: "username already exit",
      });
    }
  } catch (err) {
    console.error(err, "singup faild");
    return res.status(400).json({
      message: "singup faild",
    });
  }
};

const LogIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }
    const user = await db.signUp.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      data: user.toJSON(),
    });

  } catch (err) {
    console.error(err, "Login failed");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = { LogIn, SingUp };
