const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = await User.create({
        ...req.body,
        password: hashedPassword
    });

    res.json({
        message: "data saved sucessfully",
        data: data?.dataValues,
        userId: req.user
    })
}

const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const userView = await User.findOne({
            where: {
                id: userId
            }
        });
        if (!userView) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "succesfully see and view",
            data: userView,
            userId: req.user
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "user data not found"
        })
    }
}

const getUserAll = async (req, res, next) => {
    try {
        const userList = await User.findAll();
        return res.status(200).json({
            message: "Successfully got data",
            data: userList,
            userId: req.user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to load data",
            error: err.message
        });
    }
}

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        await User.destroy({ where: { id: userId } });
        const userList = await User.findAll();
        return res.status(200).json({
            message: "delete data succesfully",
            data: userList,
            userId: req.user
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to delete data",
            error: err.message
        });
    }
}

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(500).json({
                message: "user Id not Found",
            })
        }
        const data = await user.update(req?.body);
        console.log(data.dataValues, 'fsdfkjsldkfjsdf')
        res.status(200).json({
            message: "data updated sucessfully",
            data: data?.dataValues,
            userId: req.user
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to load data",
            error: err.message
        });
    }
}

module.exports = { createUser, getUserById, getUserAll, deleteUser, updateUser };

